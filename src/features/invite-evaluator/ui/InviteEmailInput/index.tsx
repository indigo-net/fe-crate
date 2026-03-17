import { memo } from 'react';

import { Iconography } from '@/shared/ui';

import useInviteEmailInputController from './hook';

interface Props {
  onInvite: (email: string) => Promise<void>;
  existingEmails: string[];
  isLoading: boolean;
}

const InviteEmailInput = memo(({ onInvite, existingEmails, isLoading }: Props) => {
  const { email, error, handleChange, handleSubmit } = useInviteEmailInputController(
    existingEmails,
  );

  const handleClick = async () => {
    const validEmail = handleSubmit();
    if (validEmail) {
      await onInvite(validEmail);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleClick();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={e => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="평가자 이메일을 입력하세요"
          disabled={isLoading}
          className="flex-1 px-4 py-2.5 bg-bg-base border border-border-default rounded-slim-lg text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary disabled:opacity-50 transition-all"
        />
        <button
          onClick={handleClick}
          disabled={isLoading || !email.trim()}
          className="px-5 py-2.5 bg-brand-primary text-text-inverse font-slim-bold text-sm rounded-slim-lg hover:shadow-md hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all flex items-center gap-2"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-text-inverse/30 border-t-text-inverse rounded-full animate-spin" />
          ) : (
            <Iconography.Stroke.Plus className="w-4 h-4" />
          )}
          <span>초대</span>
        </button>
      </div>
      {error && (
        <p className="text-xs text-error font-slim-normal">{error}</p>
      )}
    </div>
  );
});

InviteEmailInput.displayName = 'InviteEmailInput';

export default InviteEmailInput;
