export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  publishDate: string;
  createdAt: string;
}

export const blogPosts: BlogPost[] = [
  {
    _id: 'bert-linear-svm-pegasos-ocr-classifier',
    title: 'From BERT to Linear SVM to Pegasos: Building a High-Recall OCR Document Classifier',
    slug: 'from-bert-to-linear-svm-to-pegasos-ocr-document-classifier',
    excerpt:
      'A detailed project write-up on cleaning noisy OCR text, detecting data leakage, comparing BERT and TF-IDF SVM models, validating on external data, and implementing Pegasos-style SVM optimization.',
    tags: ['NLP', 'OCR', 'SVM', 'Machine Learning', 'Model Evaluation'],
    publishDate: '2026-06-22',
    createdAt: '2026-06-22',
    content: `# From BERT to Linear SVM to Pegasos: Building a High-Recall OCR Document Classifier

This project started with a practical classification problem: given OCR text extracted from scanned documents, can a machine learning model identify whether a document belongs to a specific target document class?

The data came from OCR outputs, which means the text was not clean. It contained scanner artifacts, broken words, page headers, fax metadata, timestamps, provider names, repeated fragments, inconsistent spacing, and formatting noise. The goal was not simply to build a model that performed well on one train/test split. The real goal was to build a model that could generalize across newly collected OCR data.

The modeling process evolved in six stages:

1. Fine-tuning a BERT-based classifier.
2. Building a TF-IDF + Linear SVM model.
3. Finding and fixing a major data leakage issue caused by empty text values.
4. Validating the SVM on new external OCR data.
5. Implementing Pegasos-style SVM training to understand stochastic SVM optimization.
6. Comparing production SVM performance against manual Pegasos experiments.

The most important lesson from the project was that model accuracy alone is not enough. Data quality, leakage detection, external validation, and error analysis were just as important as model selection.

## The starting point: OCR text classification

The classification task was binary.

| Label | Meaning |
|---|---|
| 1 | Target document class |
| 0 | Non-target document class |

The input was OCR text. Each row represented one document. The model learned from text features and predicted whether the document belonged to the target class.

At a high level, the pipeline looked like this:

    OCR document text
      ↓
    Text cleaning and normalization
      ↓
    Feature representation
      ↓
    Binary classifier
      ↓
    Prediction: target or non-target

Because OCR text can be long and messy, I tested both deep learning and classical machine learning approaches.

## Stage 1: fine-tuning BERT

The first modeling approach used BERT for sequence classification. The text was tokenized using a BERT tokenizer, then passed into a BERT classification head with two output labels.

The first BERT model used a maximum token length of 256. This means the model only saw the first 256 tokens of each OCR document. Training used weighted cross-entropy loss to address class balance.

The BERT 256-token model performed strongly.

| Metric | Value |
|---|---:|
| Accuracy | 0.9951 |
| Macro F1 | 0.9951 |
| Target-class precision | 0.9946 |
| Target-class recall | 0.9952 |
| Target-class F1 | 0.9949 |
| False positives | 10 |
| False negatives | 9 |
| Total errors | 19 |

This was already strong performance. However, error analysis showed an important limitation: some false negatives were not borderline cases. The model was very confident they were non-target documents even though they were target documents.

That led to an important observation: the evidence needed for classification sometimes appeared after the first 256 tokens. Since the model only saw the beginning of the OCR text, it could miss the most useful parts of the document.

To test this, I retrained BERT with a maximum token length of 512.

| Metric | Value |
|---|---:|
| Accuracy | 0.9959 |
| Macro F1 | 0.9958 |
| Target-class precision | 0.9957 |
| Target-class recall | 0.9957 |
| Target-class F1 | 0.9957 |
| Estimated total errors | about 16 |

The 512-token model performed better than the 256-token version, but the core limitation remained: BERT still has a fixed input length. Long OCR documents can contain important signals beyond the model’s visible window.

This pushed the project toward classical text classification.

## Stage 2: moving to TF-IDF + Linear SVM

The next model used TF-IDF features with a Linear SVM. This approach is much simpler than BERT, but it has several practical advantages for OCR classification:

- It can use the full OCR text rather than only the first 256 or 512 tokens.
- It works very well with sparse text signals.
- It is fast to train and easy to inspect.
- It is strong for document classification when classes have repeated phrases, templates, or domain-specific vocabulary.

The vectorizer used word n-grams from one to three words, sublinear term frequency, and a large feature space.

    TfidfVectorizer(
      lowercase=True,
      ngram_range=(1, 3),
      min_df=3,
      max_df=0.95,
      max_features=500000,
      sublinear_tf=True
    )

The classifier used stochastic hinge-loss optimization.

    SGDClassifier(
      loss="hinge",
      penalty="l2",
      alpha=1e-5,
      class_weight="balanced"
    )

This is effectively a large-scale linear SVM trained with stochastic optimization. The loss="hinge" setting makes it an SVM-style classifier, while penalty="l2" controls the weight size through regularization.

The regularization parameter was alpha = 1e-5. Conceptually, this plays a similar role to the lambda parameter in Pegasos-style SVM optimization. A smaller value allows the model to fit the data more closely, while a larger value forces stronger regularization.

The first SVM experiment looked extremely strong, but that result turned out to be misleading.

## The data leakage discovery

At one point, the SVM produced an almost perfect result with only one error. That looked impressive, but it was suspicious.

A deeper diagnostic check revealed the issue: many rows in the non-target class had empty text in the column being used for training.

The duplicate hash check exposed the problem. The MD5 hash for the empty string appeared repeatedly:

    d41d8cd98f00b204e9800998ecf8427e

This hash corresponds to an empty string. The analysis showed that a very large number of non-target rows had empty values in the text column, while the actual OCR text existed in another column.

This created a data leakage problem. The model could learn a dataset artifact instead of the real document signal:

    empty text      → non-target class
    non-empty text  → target class

That is not real classification. It is learning a shortcut. The inflated result had to be rejected.

This was one of the most important lessons in the project: a model can achieve excellent metrics for the wrong reason.

## Fixing the dataset

The dataset was repaired by checking both available text columns. If the main text column was empty, the pipeline used the backup OCR text column.

The repair logic was:

    if text is not empty:
      use text
    else:
      use OCR text column

After fixing the text field, the dataset looked much more valid.

| Step | Rows |
|---|---:|
| Original corrected dataset | 104,093 |
| After exact duplicate removal | 103,847 |

After deduplication, the corrected dataset contained:

| Class | Count | Percent |
|---|---:|---:|
| Target class | 52,374 | 50.43% |
| Non-target class | 51,473 | 49.57% |
| Total | 103,847 | 100% |

A conflict check was also performed to make sure the same exact OCR text did not appear with both labels. No conflicting duplicate labels were found.

This step made the later model results much more defensible.

## Stage 3: SVM on the corrected dataset

After fixing the empty-text issue and removing exact duplicates, I trained the TF-IDF + Linear SVM again.

| Metric | Value |
|---|---:|
| Test size | 20,770 |
| Accuracy | 0.9992 |
| Macro F1 | 0.9992 |
| Target-class precision | 0.9996 |
| Target-class recall | 0.9989 |
| Target-class F1 | 0.9992 |
| False positives | 4 |
| False negatives | 12 |
| Total errors | 16 |

The confusion matrix was:

|  | Predicted non-target | Predicted target |
|---|---:|---:|
| True non-target | 10,291 | 4 |
| True target | 12 | 10,463 |

This result was still extremely strong, but unlike the earlier inflated result, it was now based on a repaired and deduplicated dataset.

## Stage 4: external positive-class recall test

After the corrected SVM performed well internally, the next question was whether it could generalize to newly collected OCR data.

A separate dataset containing 34,394 new target-class OCR records was prepared. This dataset had a nested OCR structure where text was stored inside a pages field. The cleaning pipeline extracted page-level text and combined it into document-level text.

The preparation results were:

| Step | Count |
|---|---:|
| Raw new OCR records | 34,394 |
| Duplicate records removed | 91 |
| Unique records retained | 34,303 |
| Empty-text rows | 0 |

This dataset contained only the positive class, so it could not be used to measure full accuracy or precision. Instead, it was used as an external recall test.

The existing SVM trained on the corrected 100K dataset was tested on the 34,303 new positive documents.

| Metric | Value |
|---|---:|
| External positive-class rows | 34,303 |
| Correctly detected target documents | 34,236 |
| Missed target documents | 67 |
| Target-class recall | 0.9980 |
| Target-class F1 | 0.9990 |

This was an important validation step. The model had never trained on this new dataset, yet it detected 99.80% of the target documents.

This suggested that the SVM was not simply memorizing the corrected training set. It generalized well to newly collected OCR data.

## Stage 5: building the combined 138K dataset

After the external test, the new 34,303 positive examples were merged into the corrected 100K dataset.

The final combined dataset contained:

| Class | Count | Percent |
|---|---:|---:|
| Target class | 86,677 | 62.74% |
| Non-target class | 51,473 | 37.26% |
| Total | 138,150 | 100% |

Because the combined dataset became more positive-heavy, the SVM retained class_weight="balanced". This prevented the model from over-favoring the larger target class.

The combined dataset was shuffled and split into train/test sets:

| Split | Count |
|---|---:|
| Training set | 110,520 |
| Test set | 27,630 |

The SVM trained on the combined 138K dataset achieved:

| Metric | Value |
|---|---:|
| Accuracy | 0.9993 |
| Macro F1 | 0.9992 |
| Target-class precision | 0.9995 |
| Target-class recall | 0.9994 |
| Target-class F1 | 0.9994 |
| Non-target precision | 0.9989 |
| Non-target recall | 0.9991 |
| False positives | 9 |
| False negatives | 11 |
| Total errors | 20 |

The confusion matrix was:

|  | Predicted non-target | Predicted target |
|---|---:|---:|
| True non-target | 10,286 | 9 |
| True target | 11 | 17,324 |

This became the strongest production model result.

## Why the SVM worked so well

The SVM performed extremely well because this classification problem had strong lexical and structural signals.

OCR documents often contain repeated domain-specific patterns, such as:

- clinical complaint sections
- history sections
- diagnosis sections
- assessment language
- provider or visit descriptions
- injury and treatment terminology
- repeated document templates
- class-specific phrase patterns

TF-IDF is very effective when the presence, absence, and frequency of terms or phrases carry strong classification information.

The SVM also had an advantage over BERT: it could use the full document text. BERT was limited by token length, while TF-IDF could represent signals appearing anywhere in the OCR text.

## Stage 6: testing Pegasos-style SVM

After building the production SVM, I implemented a manual Pegasos-style SVM to better understand how stochastic SVM optimization works.

Pegasos is a primal SVM optimization method that uses stochastic sub-gradient updates. The core objective is:

    minimize: lambda / 2 * ||w||^2 + hinge loss

The hinge-loss condition is based on the margin:

    margin = y * (w dot x)

If margin >= 1, the example is correctly classified with enough margin. If margin < 1, the example violates the margin and contributes to the update.

The learning rate in Pegasos changes over time:

    eta_t = 1 / (lambda * t)

| Symbol | Meaning |
|---|---|
| eta_t | learning rate at step t |
| lambda | regularization strength |
| t | update step |

In the full Pegasos experiment, the settings were:

| Parameter | Value |
|---|---:|
| Lambda | 1e-5 |
| Epochs | 5 |
| Batch size | 512 |
| Max TF-IDF features | 300,000 |
| N-gram range | 1 to 3 |
| Class weights | Yes |

The learning rate starts large and decreases as training progresses. Early in training, the model makes larger corrections. Later, as t increases, the learning rate becomes smaller, allowing the model to stabilize.

## Pegasos on a 30K sample

The first Pegasos experiment used a balanced 30,000-document sample. This was useful for learning and debugging.

| Class | Count |
|---|---:|
| Target class | 15,000 |
| Non-target class | 15,000 |

The test set contained 6,000 documents.

| Metric | Value |
|---|---:|
| Accuracy | 0.9940 |
| Macro F1 | 0.9940 |
| Target-class precision | 0.9924 |
| Target-class recall | 0.9957 |
| Target-class F1 | 0.9940 |
| False positives | 23 |
| False negatives | 13 |
| Total errors | 36 |

The most useful training signal was the decline in margin violations:

| Epoch | Average margin violations per batch |
|---|---:|
| 1 | 128.88 |
| 2 | 128.19 |
| 3 | 124.90 |
| 4 | 55.71 |
| 5 | 1.73 |

This showed that Pegasos was learning. By the final epoch, very few examples were violating the margin.

## Pegasos on the full 138K dataset

After confirming the algorithm worked on a sample, I trained Pegasos on the full combined dataset.

| Metric | Value |
|---|---:|
| Dataset size | 138,150 |
| Train size | 110,520 |
| Test size | 27,630 |
| Accuracy | 0.9980 |
| Macro F1 | 0.9979 |
| Target-class precision | 0.9994 |
| Target-class recall | 0.9975 |
| Target-class F1 | 0.9984 |
| Non-target precision | 0.9957 |
| Non-target recall | 0.9990 |
| False positives | 10 |
| False negatives | 44 |
| Total errors | 54 |

The confusion matrix was:

|  | Predicted non-target | Predicted target |
|---|---:|---:|
| True non-target | 10,285 | 10 |
| True target | 44 | 17,291 |

The margin violations dropped sharply:

| Epoch | Average margin violations per batch |
|---|---:|
| 1 | 258.38 |
| 2 | 156.99 |
| 3 | 3.21 |
| 4 | 2.37 |
| 5 | 2.24 |

This confirmed that the Pegasos-style optimizer was working well.

However, compared with the production SVM, Pegasos had more false negatives:

| Model | False positives | False negatives | Total errors |
|---|---:|---:|---:|
| Production TF-IDF + Linear SVM | 9 | 11 | 20 |
| Manual Pegasos SVM | 10 | 44 | 54 |

If the priority is to avoid missing target documents, the production SVM remains better.

## Pegasos on a separate external dataset

The full Pegasos model was also tested on a separate external dataset with 19,286 documents.

| Class | Count |
|---|---:|
| Target class | 9,303 |
| Non-target class | 9,983 |
| Total | 19,286 |

The result was:

| Metric | Value |
|---|---:|
| Accuracy | 0.9824 |
| Macro F1 | 0.9824 |
| Target-class precision | 0.9839 |
| Target-class recall | 0.9796 |
| Target-class F1 | 0.9817 |
| Non-target precision | 0.9810 |
| Non-target recall | 0.9851 |
| False positives | 149 |
| False negatives | 190 |
| Total errors | 339 |

The confusion matrix was:

|  | Predicted non-target | Predicted target |
|---|---:|---:|
| True non-target | 9,834 | 149 |
| True target | 190 | 9,113 |

This external performance was lower than the internal test performance. That is expected when the new dataset has different OCR quality, formatting, templates, or document distributions.

This showed the value of external validation. Internal test performance can be very high, but external data reveals how much the model depends on the original data distribution.

## Model comparison summary

| Model / Experiment | Test type | Test size | Accuracy | Macro F1 | Target recall | FP | FN | Total errors |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| BERT, 256-token limit | Internal | 3,858 | 0.9951 | 0.9951 | 0.9952 | 10 | 9 | 19 |
| BERT, 512-token limit | Internal | about 3,858 | 0.9959 | 0.9958 | 0.9957 | — | — | about 16 |
| TF-IDF + Linear SVM | Corrected 100K internal | 20,770 | 0.9992 | 0.9992 | 0.9989 | 4 | 12 | 16 |
| TF-IDF + Linear SVM | External positive-only recall | 34,303 | 0.9980 | Not comparable | 0.9980 | N/A | 67 | 67 |
| TF-IDF + Linear SVM | Combined 138K internal | 27,630 | 0.9993 | 0.9992 | 0.9994 | 9 | 11 | 20 |
| Pegasos SVM | 30K balanced sample | 6,000 | 0.9940 | 0.9940 | 0.9957 | 23 | 13 | 36 |
| Pegasos SVM | Full 138K internal | 27,630 | 0.9980 | 0.9979 | 0.9975 | 10 | 44 | 54 |
| Pegasos SVM | External 19K dataset | 19,286 | 0.9824 | 0.9824 | 0.9796 | 149 | 190 | 339 |

## Key observations

### 1. BERT worked well, but token length was a limitation

BERT performed strongly, but OCR documents are often long. When useful evidence appeared after the token limit, the model could miss it. Increasing the maximum length from 256 to 512 improved results, but did not fully remove the limitation.

### 2. TF-IDF + Linear SVM was surprisingly strong

The classical SVM outperformed BERT in this case. This happened because the task had strong document-level lexical signals, and TF-IDF could represent the full OCR text rather than only the beginning of the document.

### 3. Data leakage almost produced a misleading conclusion

The most important data issue was the discovery that many non-target rows had empty text in the modeling column. If this had not been detected, the model would have appeared almost perfect for the wrong reason.

The fix required:

- checking text length by label
- finding repeated empty-string hashes
- repairing empty text using the correct OCR text column
- removing exact duplicates
- checking for conflicting labels

This turned the experiment from a misleading result into a defensible pipeline.

### 4. External validation was essential

The external positive-only recall test showed that the production SVM could generalize to newly collected OCR data. This was stronger evidence than internal accuracy alone.

### 5. Pegasos was useful for learning optimization

The manual Pegasos implementation helped explain how SVM optimization works:

- hinge loss
- margin violations
- L2 regularization
- lambda
- decaying learning rate
- stochastic updates
- projection step

Pegasos performed well, but the production SVM remained stronger.

### 6. External datasets revealed domain shift

The full Pegasos model performed very well internally but dropped on a different external dataset. This suggests that OCR quality, provider templates, document formatting, or labeling differences matter.

## Final production choice

The best production model was the TF-IDF + Linear SVM trained on the combined 138K dataset.

Its strengths were:

- highest overall accuracy
- lowest total error count
- very low false negatives
- fast training time
- full-document OCR representation
- strong external recall performance
- easy reproducibility

The final production result was:

| Final production metric | Value |
|---|---:|
| Accuracy | 99.93% |
| Target-class recall | 99.94% |
| False positives | 9 |
| False negatives | 11 |
| Total errors | 20 out of 27,630 |

For this task, the classical SVM was not just a baseline. It became the strongest model.

## Conclusion

This project started with a modern deep learning model and ended with a classical linear model as the best practical solution.

BERT was useful and performed well, but the TF-IDF + Linear SVM better matched the structure of the problem. OCR documents contained repeated terms, templates, and document-level signals that sparse text features could capture very effectively.

The most important part of the project was not simply comparing algorithms. It was the process of making the data trustworthy. The discovery of empty text values in one class showed how easily a model can exploit artifacts instead of learning the real task.

After repairing the dataset, removing duplicates, validating externally, and comparing SVM with Pegasos-style optimization, the final conclusion was clear: a carefully cleaned dataset plus a well-tuned linear SVM produced the most accurate and reliable classifier for this OCR document classification task.

The overall lesson is simple:

In applied machine learning, the best model is not always the most complex model. The best model is the one that learns the real signal, survives external validation, and remains reliable after data quality problems are fixed.`,
  },
  {
    _id: 'why-static-blog',
    title: 'Why I Moved This Blog Away from MongoDB',
    slug: 'why-i-moved-this-blog-away-from-mongodb',
    excerpt:
      'For a personal portfolio, a static blog inside the GitHub repo is simpler, faster, and easier to deploy on Vercel.',
    tags: ['Next.js', 'Vercel', 'Portfolio'],
    publishDate: '2026-06-21',
    createdAt: '2026-06-21',
    content: `# Why I Moved This Blog Away from MongoDB

For a personal portfolio, a database is not always necessary. A database is useful when posts need to be created through an admin dashboard, edited by multiple users, or updated frequently from an application interface.

But for a portfolio blog, static content is often better.

## Why static works well

A static blog stores posts directly in the codebase. That means the content lives in GitHub, deploys through Vercel, and does not require a separate database service.

The benefits are simple:

- fewer deployment errors
- no database credentials to manage
- faster page rendering
- easier version control
- simpler long-term maintenance

## Tradeoff

The tradeoff is that new posts require a Git commit. For my use case, that is acceptable because blog posts are part of the portfolio itself.

## Final decision

I chose a static blog because it keeps the site lightweight and reliable. If I need a full CMS later, I can add one. For now, GitHub plus Vercel is enough.`,
  },
  {
    _id: 'research-notes-computational-social-science',
    title: 'Research Notes: Computational Social Science and Health Data',
    slug: 'research-notes-computational-social-science-health-data',
    excerpt:
      'A short note on using computational tools for social research, public health analytics, and policy-relevant data work.',
    tags: ['Research', 'Computational Social Science', 'Health Data'],
    publishDate: '2026-06-21',
    createdAt: '2026-06-21',
    content: `# Research Notes: Computational Social Science and Health Data

Computational social science gives researchers a way to study social patterns using data, code, and theory together. For health research, this is especially useful because access, inequality, risk, and behavior are often shaped by social conditions.

## My research direction

My work sits between social research, machine learning, and health analytics. I am interested in how computational tools can help answer practical questions about healthcare access, public health inequality, document intelligence, and policy implementation.

## Why this matters

Health data is not just technical. It reflects institutions, social structures, and lived experience. That is why computational methods should be combined with careful research design and domain knowledge.

## Tools I use

I often work with Python, R, survey data, text data, machine learning models, and reproducible reporting workflows. The goal is not only to build models, but to produce evidence that can be interpreted and used.

## Ongoing focus

I am continuing to build projects around healthcare analytics, DHS survey analysis, NLP systems, and applied computational research.`,
  },
];

export function getAllBlogPosts() {
  return [...blogPosts].sort((a, b) => {
    const bDate = new Date(b.publishDate || b.createdAt).getTime();
    const aDate = new Date(a.publishDate || a.createdAt).getTime();
    return bDate - aDate;
  });
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug) ?? null;
}

export function getAllBlogTags() {
  return Array.from(new Set(blogPosts.flatMap((post) => post.tags))).sort();
}
