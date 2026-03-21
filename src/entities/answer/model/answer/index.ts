import { UUID } from '@/shared/lib';
import { CustomModel } from '@/shared/model';

interface AnswerState<T> {
  id: string;
  question: T;
  value: string | string[] | null;
}

interface Props<T> {
  id?: string;
  question: T;
  value?: string | string[] | null;
}

class AnswerModel<T> extends CustomModel<AnswerState<T>> {
  private state: AnswerState<T>;

  constructor(props: Props<T>) {
    super();
    this.state = {
      id: props.id || UUID.v4(),
      question: props.question,
      value: props.value ?? null,
    };
  }

  getValue<K extends keyof AnswerState<T>>(key: K): AnswerState<T>[K] {
    return this.state[key];
  }

  setValue<K extends keyof AnswerState<T>>(key: K, value: AnswerState<T>[K]): AnswerModel<T> {
    return this.clone({
      [key]: value,
    });
  }

  toJSON(): AnswerState<T> {
    return this.state;
  }

  clone(props?: Partial<AnswerState<T>>): AnswerModel<T> {
    return new AnswerModel<T>({
      id: this.state.id,
      question: props?.question ?? this.state.question,
      value: props?.value !== undefined ? props.value : this.state.value,
    });
  }
}

export default AnswerModel;
