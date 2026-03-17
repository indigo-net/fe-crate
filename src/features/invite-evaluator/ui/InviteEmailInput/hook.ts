import { useCallback, useState } from 'react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const useInviteEmailInputController = (
  existingEmails: string[],
) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validate = useCallback(
    (value: string): string | null => {
      if (!value.trim()) {
        return '이메일을 입력해주세요.';
      }
      if (!EMAIL_REGEX.test(value)) {
        return '올바른 이메일 형식이 아닙니다.';
      }
      if (existingEmails.includes(value.trim())) {
        return '이미 초대된 이메일입니다.';
      }
      return null;
    },
    [existingEmails],
  );

  const handleChange = useCallback((value: string) => {
    setEmail(value);
    setError(null);
  }, []);

  const handleSubmit = useCallback((): string | null => {
    const validationError = validate(email);
    if (validationError) {
      setError(validationError);
      return null;
    }
    const trimmed = email.trim();
    setEmail('');
    setError(null);
    return trimmed;
  }, [email, validate]);

  return { email, error, handleChange, handleSubmit };
};

export default useInviteEmailInputController;
