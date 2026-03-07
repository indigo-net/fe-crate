import { UUID } from '@/shared/lib';
import { CustomModel } from '@/shared/model';

import type { EvaluationState, EvaluationStatus, QuestionScore } from '@/entities/evaluation';

interface Props {
  id?: string;
  applicationId?: string;
  evaluatorId?: string;
  formId?: string;
  status?: EvaluationStatus;
  scores?: QuestionScore[];
  totalScore?: number;
  overallComment?: string;
}

class EvaluationModel extends CustomModel<EvaluationState> {
  private state: EvaluationState;

  constructor(props: Props) {
    super();
    this.state = {
      id: props.id || UUID.v4(),
      applicationId: props.applicationId || '',
      evaluatorId: props.evaluatorId || '',
      formId: props.formId || '',
      status: props.status || 'PENDING',
      scores: props.scores || [],
      totalScore: props.totalScore ?? 0,
      overallComment: props.overallComment ?? undefined,
    };
  }

  getValue<K extends keyof EvaluationState>(key: K): EvaluationState[K] {
    return this.state[key];
  }

  setValue<K extends keyof EvaluationState>(key: K, value: EvaluationState[K]): EvaluationModel {
    return this.clone({
      [key]: value,
    });
  }

  toJSON(): EvaluationState {
    return this.state;
  }

  clone(props?: Partial<EvaluationState>): EvaluationModel {
    return new EvaluationModel({
      ...this.toJSON(),
      ...props,
    });
  }
}

export default EvaluationModel;
