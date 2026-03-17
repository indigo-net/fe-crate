import { UUID } from '@/shared/lib';
import { CustomModel } from '@/shared/model';

import type { InvitationStatus } from '@/entities/evaluator/types';

interface State {
  id: string;
  formId: string;
  email: string;
  inviteToken: string;
  status: InvitationStatus;
  expiresAt: string;
  acceptedAt: string | null;
  createdAt: string;
}

interface Props {
  id?: string;
  formId?: string;
  email?: string;
  inviteToken?: string;
  status?: InvitationStatus;
  expiresAt?: string;
  acceptedAt?: string | null;
  createdAt?: string;
}

class InvitationModel extends CustomModel<State> {
  private state: State;

  constructor(props: Props) {
    super();
    this.state = {
      id: props.id || UUID.v4(),
      formId: props.formId || '',
      email: props.email || '',
      inviteToken: props.inviteToken || '',
      status: props.status || 'PENDING',
      expiresAt: props.expiresAt || '',
      acceptedAt: props.acceptedAt ?? null,
      createdAt: props.createdAt || '',
    };
  }

  getValue<K extends keyof State>(key: K): State[K] {
    return this.state[key];
  }

  setValue<K extends keyof State>(key: K, value: State[K]): InvitationModel {
    return this.clone({ [key]: value });
  }

  toJSON(): State {
    return this.state;
  }

  clone(props?: Partial<State>): InvitationModel {
    return new InvitationModel({ ...this.toJSON(), ...props });
  }
}

export default InvitationModel;
