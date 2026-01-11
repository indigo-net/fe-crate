import { memo } from 'react';

import useFormSignatureEditSectionController from './hook';

const FormSignatureEditSection = memo(() => {
  const { formSignature, handleTitleChange, handleDescriptionChange } =
    useFormSignatureEditSectionController();

  return (
    <section className="w-full flex flex-col gap-[12px] p-[24px] bg-bg-default border-t-[8px] border-x border-b border-t-brand-primary border-x-divider-default border-b-divider-default rounded-[12px] shadow-sm">
      <div className="w-full">
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          className="w-full py-[8px] text-[32px] font-bold bg-transparent border-b border-gray-200 text-text-primary focus:border-brand-primary focus:outline-none placeholder:text-text-tertiary transition-colors"
          maxLength={100}
          value={formSignature?.getValue('title') ?? ''}
          onChange={e => handleTitleChange(e.target.value)}
        />
      </div>

      <div className="w-full">
        <input
          type="text"
          placeholder="필요할 경우, 추가적인 설명을 입력해주세요."
          className="w-full py-[4px] text-[14px] bg-transparent border-b border-gray-200 text-text-secondary focus:border-brand-primary focus:outline-none placeholder:text-text-tertiary transition-colors"
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
