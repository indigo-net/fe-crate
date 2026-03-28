import { UUID } from '@/shared/lib';
import { CustomModel } from '@/shared/model';

import type { EvaluationStatus } from '../../types';

interface State<T> {
  id: string;
  target: T;
  score: number;
  weight: number;
  comment?: string;
  status: EvaluationStatus;
}

interface Props<T> {
  id?: string;
  target: T;
  score?: number;
  weight?: number;
  comment?: string;
  status?: EvaluationStatus;
}

class EvaluationModel<T> extends CustomModel<State<T>> {
  private state: State<T>;

  constructor(props: Props<T>) {
    super();
    this.state = {
      id: props.id || UUID.v4(),
      target: props.target,
      score: props.score ?? 0,
      weight: props.weight ?? 1,
      comment: props.comment ?? undefined,
      status: props.status ?? 'IN_COMPLETE',
    };
  }

  getValue<K extends keyof State<T>>(key: K): State<T>[K] {
    return this.state[key];
  }

  setValue<K extends keyof State<T>>(
    key: K,
    value: State<T>[K],
  ): EvaluationModel<T> {
    return this.clone({
      [key]: value,
    });
  }

  toJSON(): State<T> {
    return this.state;
  }

  clone(props?: Partial<State<T>>): EvaluationModel<T> {
    return new EvaluationModel<T>({
      id: this.state.id,
      target: props?.target ?? this.state.target,
      score: props?.score !== undefined ? props.score : this.state.score,
      weight: props?.weight !== undefined ? props.weight : this.state.weight,
      comment: props?.comment !== undefined ? props.comment : this.state.comment,
      status: props?.status !== undefined ? props.status : this.state.status,
    });
  }
}

export default EvaluationModel;
