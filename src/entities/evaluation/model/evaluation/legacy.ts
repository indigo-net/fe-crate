import { UUID } from '@/shared/lib';
import { CustomModel } from '@/shared/model';

import type { LegacyEvaluationState, EvaluationStatus, QuestionScore } from '../../types';

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

class LegacyEvaluationModel extends CustomModel<LegacyEvaluationState> {
  private state: LegacyEvaluationState;

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

  getValue<K extends keyof LegacyEvaluationState>(key: K): LegacyEvaluationState[K] {
    return this.state[key];
  }

  setValue<K extends keyof LegacyEvaluationState>(
    key: K,
    value: LegacyEvaluationState[K],
  ): LegacyEvaluationModel {
    return this.clone({
      [key]: value,
    });
  }

  toJSON(): LegacyEvaluationState {
    return this.state;
  }

  clone(props?: Partial<LegacyEvaluationState>): LegacyEvaluationModel {
    return new LegacyEvaluationModel({
      ...this.toJSON(),
      ...props,
    });
  }
}

export default LegacyEvaluationModel;
