import { memo } from 'react';

import InvitationListTable from '../InvitationListTable';

interface Props {
  formId: string;
}

const ModalInviteEvaluator = memo(({ formId }: Props) => {
  return <InvitationListTable formId={formId} />;
});

ModalInviteEvaluator.displayName = 'ModalInviteEvaluator';

export default ModalInviteEvaluator;
