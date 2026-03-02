import { applicationsHandlers } from './applications.handler';
import { evaluationsHandlers } from './evaluations.handler';
import { evaluatorsHandlers } from './evaluators.handler';
import { formsHandlers } from './forms.handler';
import { questionsHandlers } from './questions.handler';

export const handlers = [
  ...formsHandlers,
  ...questionsHandlers,
  ...applicationsHandlers,
  ...evaluationsHandlers,
  ...evaluatorsHandlers,
];
