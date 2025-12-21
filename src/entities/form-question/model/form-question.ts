import TypeGuard from '@/shared/lib/type-guard';
import UUID from '@/shared/lib/uuid';

import CustomModel from '@/shared/model/custom-model';

import FormQuestionOptionModel from './form-question-option';

import type { FormQuestionType } from '../type';

interface State {
  id: string;
  type: FormQuestionType;
  // 질문 내용
  title: string;
  // 질문 설명
  description: string | null;
  // 필수 질문 여부
  required: boolean;
  // (객관식 질문일 경우), 선택지 목록)
  options: FormQuestionOptionModel[] | null;
}

interface Props {
  id?: string;
  type: FormQuestionType;
  title: string;
  description?: string;
  required?: boolean;
  options?: FormQuestionOptionModel[];
}

class FormQuestionModel extends CustomModel<State> {
  private state: State;
  constructor(props: Props) {
    super();
    const { id, type, title, description, required, options } = props;

    const isValidateOptions =
      !TypeGuard.checkUndefined(options) &&
      options.length !== 0 &&
      type !== 'SHORT_TEXT' &&
      type !== 'LONG_TEXT';

    this.state = {
      id: id || UUID.v4(),
      type: type,
      title: title,
      description: description || null,
      required: required || false,
      options: isValidateOptions ? options : null,
    };
  }

  get id(): string {
    return this.state.id;
  }

  pushOption(option: FormQuestionOptionModel): FormQuestionModel {
    const options = this.state.options;
    if (TypeGuard.checkNull(options)) {
      return this;
    }
    return this.clone({
      options: [...options, option],
    });
  }

  toJSON(): State {
    return this.state;
  }

  clone(props?: Partial<Exclude<State, 'id'>>): FormQuestionModel {
    return new FormQuestionModel({
      id: this.state.id,
      type: props?.type ?? this.state.type,
      title: props?.title ?? this.state.title,
      required: TypeGuard.checkBoolean(props?.required) ? props?.required : this.state.required,
      description: (props?.description ?? this.state.description) || undefined,
      options: (props?.options ?? this.state.options) || undefined,
    });
  }
}

export default FormQuestionModel;
