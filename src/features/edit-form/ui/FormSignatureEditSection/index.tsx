import { memo } from 'react';

import useFormSignatureEditSectionController from './hook';

const FormSignatureEditSection = memo(() => {
  const { formSignature, handleTitleChange, handleDescriptionChange } =
    useFormSignatureEditSectionController();

  return (
    <section className="w-full flex flex-col gap-4 p-8 bg-bg-base border-t-8 border-x border-b border-t-brand-primary border-border-default rounded-slim-2xl shadow-sm hover:shadow-md transition-shadow">
      <div className="w-full">
        <input
          type="text"
          placeholder="제목을 입력해주세요"
          className="w-full py-2 text-4xl font-slim-bold bg-transparent border-b-2 border-border-default text-text-primary focus:border-brand-primary focus:outline-none placeholder:text-text-tertiary transition-colors"
          maxLength={100}
          value={formSignature?.getValue('title') ?? ''}
          onChange={e => handleTitleChange(e.target.value)}
        />
      </div>

      <div className="w-full">
        <input
          type="text"
          placeholder="이 설문에 대한 설명을 입력해주세요 (선택 사항)"
          className="w-full py-2 text-base font-slim-normal bg-transparent border-b border-border-default text-text-secondary focus:border-brand-primary focus:outline-none placeholder:text-text-tertiary transition-colors"
          maxLength={200}
          value={formSignature?.getValue('description') ?? ''}
          onChange={e => handleDescriptionChange(e.target.value)}
        />
      </div>
    </section>
  );
});
FormSignatureEditSection.displayName = 'FormSignatureEditSection';

export default FormSignatureEditSection;
