import { TypeGuard, UUID } from '@/shared/lib';
import { CustomModel } from '@/shared/model';

import FormQuestionOptionModel from './option';

import type { FormQuestionType } from '../../types';

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
  description?: string | null;
  required?: boolean;
  options?: FormQuestionOptionModel[] | null;
}

class FormQuestionModel extends CustomModel<State> {
  private state: State;
  constructor(props: Props) {
    super();
    const { id, type, title, description, required, options } = props;

    const isValidateOptions =
      !!options && options.length !== 0 && type !== 'SHORT_TEXT' && type !== 'LONG_TEXT';

    this.state = {
      id: id || UUID.v4(),
      type: type,
      title: title,
      description: description || null,
      required: required || false,
      options: isValidateOptions ? options : null,
    };
  }

  getValue<K extends keyof State>(key: K): State[K] {
    return this.state[key];
  }

  setValue<K extends keyof State>(key: K, value: State[K]): FormQuestionModel {
    return this.clone({
      [key]: value,
    });
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
      description: !TypeGuard.checkUndefined(props?.description)
        ? props.description
        : this.state.description,
      options: !TypeGuard.checkUndefined(props?.options) ? props.options : this.state.options,
    });
  }
}

export default FormQuestionModel;
