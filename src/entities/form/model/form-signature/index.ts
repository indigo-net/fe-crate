import type { FormStatusType, SelectionMethodType } from '@/entities/form/model/type';

import { UUID } from '@/shared/lib';
import { CustomModel } from '@/shared/model';

interface State {
  id: string;
  title: string | null;
  description: string | null;
  questionIds: string[];
  status: FormStatusType; // 모집상태
  selectionMethod: SelectionMethodType; // 선발방식
  publishedAt: string | null; // 모집 게시일 (ISO 8601 UTC string)
  closedAt: string | null; // 모집 종료일 (ISO 8601 UTC string)
}

interface Props {
  id?: string;
  title?: string | null;
  description?: string | null;
  questionIds?: string[];
  status?: FormStatusType;
  selectionMethod?: SelectionMethodType;
  publishedAt?: string | null;
  closedAt?: string | null;
}

class FormSignatureModel extends CustomModel<State> {
  private state: State;

  constructor(props: Props) {
    super();
    this.state = {
      id: props.id || UUID.v4(),
      title: props.title || null,
      description: props.description || null,
      questionIds: props.questionIds || [],
      status: props.status || 'DRAFT',
      selectionMethod: props.selectionMethod || 'QUANTITATIVE',
      publishedAt: props.publishedAt || null,
      closedAt: props.closedAt || null,
    };
  }

  getValue<K extends keyof State>(key: K): State[K] {
    return this.state[key];
  }

  setValue<K extends keyof State>(key: K, value: State[K]): FormSignatureModel {
    return this.clone({
      [key]: value,
    });
  }

  toJSON(): State {
    return this.state;
  }

  clone(props?: Partial<State>): FormSignatureModel {
    return new FormSignatureModel({
      ...this.toJSON(),
      ...props,
    });
  }
}

export default FormSignatureModel;
