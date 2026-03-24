'use client';

import { FormEvent, useState } from 'react';

type Lang = 'en' | 'zh';

interface ContactMessageFormProps {
  lang: Lang;
}

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FieldName = keyof FormValues;
type FormErrors = Partial<Record<FieldName, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const COPY = {
  en: {
    labels: {
      name: 'Your Name',
      email: 'Email Address',
      subject: 'Subject',
      message: 'Message',
    },
    placeholders: {
      name: 'John Doe',
      email: 'john@example.com',
      message: "Tell us what's on your mind...",
    },
    subjectPlaceholder: 'Select a topic',
    subjects: [
      { value: 'suggestion', label: 'Provider Suggestion' },
      { value: 'correction', label: 'Information Correction' },
      { value: 'partnership', label: 'Partnership Inquiry' },
      { value: 'technical', label: 'Technical Issue' },
      { value: 'general', label: 'General Question' },
    ],
    errors: {
      name: 'Please enter at least 2 characters for your name.',
      email: 'Please enter a valid email address.',
      subject: 'Please select a subject.',
      message: 'Please enter at least 10 characters in your message.',
    },
    submit: 'Send Message',
    submitting: 'Sending...',
    reset: 'Clear Form',
    success: 'Message sent successfully.',
  },
  zh: {
    labels: {
      name: '你的姓名',
      email: '邮箱地址',
      subject: '主题',
      message: '留言内容',
    },
    placeholders: {
      name: '张三',
      email: 'name@example.com',
      message: '请描述你的问题或建议...',
    },
    subjectPlaceholder: '请选择主题',
    subjects: [
      { value: 'suggestion', label: '新增提供商建议' },
      { value: 'correction', label: '信息纠错' },
      { value: 'partnership', label: '合作咨询' },
      { value: 'technical', label: '技术问题' },
      { value: 'general', label: '其他问题' },
    ],
    errors: {
      name: '姓名至少需要 2 个字符。',
      email: '请输入有效的邮箱地址。',
      subject: '请选择主题。',
      message: '留言内容至少需要 10 个字符。',
    },
    submit: '发送留言',
    submitting: '提交中...',
    reset: '清空',
    success: '留言提交成功',
  },
} as const;

const INITIAL_VALUES: FormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export default function ContactMessageForm({ lang }: ContactMessageFormProps) {
  const text = COPY[lang];
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = (nextValues: FormValues): FormErrors => {
    const nextErrors: FormErrors = {};

    if (nextValues.name.trim().length < 2) {
      nextErrors.name = text.errors.name;
    }

    if (!EMAIL_REGEX.test(nextValues.email.trim())) {
      nextErrors.email = text.errors.email;
    }

    if (!nextValues.subject.trim()) {
      nextErrors.subject = text.errors.subject;
    }

    if (nextValues.message.trim().length < 10) {
      nextErrors.message = text.errors.message;
    }

    return nextErrors;
  };

  const updateField = (field: FieldName, fieldValue: string) => {
    setValues((prev) => ({ ...prev, [field]: fieldValue }));
    if (errors[field]) {
      setErrors((prev) => {
        const { [field]: _ignored, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setShowSuccess(false);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsSubmitting(false);
    setShowSuccess(true);
    setValues(INITIAL_VALUES);

    setTimeout(() => setShowSuccess(false), 2800);
  };

  const handleReset = () => {
    setValues(INITIAL_VALUES);
    setErrors({});
    setShowSuccess(false);
  };

  const fieldClass = (field: FieldName) =>
    [
      'w-full rounded-lg border bg-surface-1 px-4 py-3 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2',
      errors[field]
        ? 'border-danger-500/70 focus:ring-danger-500/30'
        : 'border-white-08 focus:ring-brand-300/20',
      isSubmitting ? 'opacity-80' : '',
    ].join(' ');

  return (
    <>
      {showSuccess && (
        <div
          role="status"
          className="mb-5 rounded-lg border border-brand-300/35 bg-brand-12 px-4 py-3 text-body-sm text-brand-300"
        >
          {text.success}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor={`contact-name-${lang}`} className="mb-2 block text-body-sm font-medium text-text-primary">
              {text.labels.name}
            </label>
            <input
              type="text"
              id={`contact-name-${lang}`}
              name="name"
              value={values.name}
              onChange={(event) => updateField('name', event.target.value)}
              className={fieldClass('name')}
              placeholder={text.placeholders.name}
              disabled={isSubmitting}
            />
            {errors.name && <p className="mt-2 text-body-sm text-danger-500">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor={`contact-email-${lang}`} className="mb-2 block text-body-sm font-medium text-text-primary">
              {text.labels.email}
            </label>
            <input
              type="email"
              id={`contact-email-${lang}`}
              name="email"
              value={values.email}
              onChange={(event) => updateField('email', event.target.value)}
              className={fieldClass('email')}
              placeholder={text.placeholders.email}
              disabled={isSubmitting}
            />
            {errors.email && <p className="mt-2 text-body-sm text-danger-500">{errors.email}</p>}
          </div>
        </div>

        <div>
          <label htmlFor={`contact-subject-${lang}`} className="mb-2 block text-body-sm font-medium text-text-primary">
            {text.labels.subject}
          </label>
          <select
            id={`contact-subject-${lang}`}
            name="subject"
            value={values.subject}
            onChange={(event) => updateField('subject', event.target.value)}
            className={fieldClass('subject')}
            disabled={isSubmitting}
          >
            <option value="">{text.subjectPlaceholder}</option>
            {text.subjects.map((subject) => (
              <option key={subject.value} value={subject.value}>
                {subject.label}
              </option>
            ))}
          </select>
          {errors.subject && <p className="mt-2 text-body-sm text-danger-500">{errors.subject}</p>}
        </div>

        <div>
          <label htmlFor={`contact-message-${lang}`} className="mb-2 block text-body-sm font-medium text-text-primary">
            {text.labels.message}
          </label>
          <textarea
            id={`contact-message-${lang}`}
            name="message"
            rows={6}
            value={values.message}
            onChange={(event) => updateField('message', event.target.value)}
            className={`${fieldClass('message')} resize-none`}
            placeholder={text.placeholders.message}
            disabled={isSubmitting}
          />
          {errors.message && <p className="mt-2 text-body-sm text-danger-500">{errors.message}</p>}
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="btn-primary-inverse flex flex-1 items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-80"
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-inverse-text/30 border-t-inverse-text" />
            )}
            {isSubmitting ? text.submitting : text.submit}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg border border-white-08 px-6 py-3 text-text-primary transition-colors hover:bg-surface-1 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting}
          >
            {text.reset}
          </button>
        </div>
      </form>
    </>
  );
}
