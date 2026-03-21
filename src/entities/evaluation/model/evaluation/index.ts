import { UUID } from '@/shared/lib';
import { CustomModel } from '@/shared/model';

import type { EvaluationState } from '../../types';

interface Props<T> {
  id?: string;
  target: T;
  score?: number;
  weight?: number;
  comment?: string;
}

class EvaluationModel<T> extends CustomModel<EvaluationState<T>> {
  private state: EvaluationState<T>;

  constructor(props: Props<T>) {
    super();
    this.state = {
      id: props.id || UUID.v4(),
      target: props.target,
      score: props.score ?? 0,
      weight: props.weight ?? 1,
      comment: props.comment ?? undefined,
    };
  }

  getValue<K extends keyof EvaluationState<T>>(key: K): EvaluationState<T>[K] {
    return this.state[key];
  }

  setValue<K extends keyof EvaluationState<T>>(
    key: K,
    value: EvaluationState<T>[K],
  ): EvaluationModel<T> {
    return this.clone({
      [key]: value,
    });
  }

  toJSON(): EvaluationState<T> {
    return this.state;
  }

  clone(props?: Partial<EvaluationState<T>>): EvaluationModel<T> {
    return new EvaluationModel<T>({
      id: this.state.id,
      target: props?.target ?? this.state.target,
      score: props?.score !== undefined ? props.score : this.state.score,
      weight: props?.weight !== undefined ? props.weight : this.state.weight,
      comment: props?.comment !== undefined ? props.comment : this.state.comment,
    });
  }
}

export default EvaluationModel;
