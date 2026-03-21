import { activitiesHandlers } from './activities.handler';
import { applicationsHandlers } from './applications.handler';
import { evaluationsHandlers } from './evaluations.handler';
import { evaluatorDashboardHandlers } from './evaluator-dashboard.handler';
import { evaluatorsHandlers } from './evaluators.handler';
import { formsHandlers } from './forms.handler';
import { invitationsHandlers } from './invitations.handler';
import { questionsHandlers } from './questions.handler';

export const handlers = [
  ...formsHandlers,
  ...questionsHandlers,
  ...applicationsHandlers,
  ...evaluationsHandlers,
  ...evaluatorsHandlers,
  ...evaluatorDashboardHandlers,
  ...activitiesHandlers,
  ...invitationsHandlers,
];
