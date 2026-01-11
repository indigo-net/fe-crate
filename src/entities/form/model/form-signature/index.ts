import { UUID } from '@/shared/lib';
import { CustomModel } from '@/shared/model';

interface State {
  id: string;
  title: string;
  description: string;
  questionIds: string[];
}

interface Props {
  id?: string;
  title?: string;
  description?: string;
  questionIds?: string[];
}

class FormSignatureModel extends CustomModel<State> {
  private state: State;

  constructor(props: Props) {
    super();
    const { id, title, description, questionIds } = props;
    this.state = {
      id: id || UUID.v4(),
      title: title || '',
      description: description || '',
      questionIds: questionIds || [],
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
