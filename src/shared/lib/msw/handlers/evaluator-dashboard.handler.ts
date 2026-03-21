import { http } from 'msw';

import { EnvManager } from '@/shared/lib';

import { applicationsStore, evaluationsStore, evaluatorsStore, formsStore } from '../fixtures';
import { MockDelayManager, MockResponseManager } from '../utils';

const BASE_URL = EnvManager.getAppEnv('VITE_API_BASE_URL') || '';
const API_PREFIX = `${BASE_URL}/api/v1`;

// 하드코딩된 현재 평가자 ID (인증 시스템 완성 후 토큰에서 추출)
const CURRENT_EVALUATOR_ID = 'evaluator-1';

export const evaluatorDashboardHandlers = [
  /**
   * GET /api/v1/evaluators/me/forms — 현재 평가자에게 배정된 폼 목록
   */
  http.get(`${API_PREFIX}/evaluators/me/forms`, async () => {
    await MockDelayManager.random('normal');

    const myEvaluators = evaluatorsStore.filter(e => e.id === CURRENT_EVALUATOR_ID);

    const assignedForms = myEvaluators
      .map(evaluator => {
        const form = formsStore.find(f => f.id === evaluator.formId);
        if (!form) {
          return null;
        }

        const formApplications = applicationsStore.filter(a => a.formId === form.id);
        const assignedApps = evaluator.assignedApplicationIds.length > 0
          ? formApplications.filter(a => evaluator.assignedApplicationIds.includes(a.id))
          : formApplications;

        const completedEvaluations = evaluationsStore.filter(
          e => e.formId === form.id && e.evaluatorId === CURRENT_EVALUATOR_ID && e.status === 'COMPLETED',
        ).length;

        return {
          formId: form.id,
          title: form.title,
          totalApplications: assignedApps.length,
          completedEvaluations,
        };
      })
      .filter(Boolean);

    return MockResponseManager.success(assignedForms);
  }),
];
