import { UUID } from '@/shared/lib';
import { CustomModel } from '@/shared/model';

interface State {
  id: string;
  // 선택지 내용
  content: string;
  // 선택 여부
  checked: boolean;
  // 기본 선택 여부
  defaultChecked: boolean;
}

interface Props {
  id?: string;
  content: string;
  checked?: boolean;
  defaultChecked?: boolean;
}

class FormQuestionOptionModel extends CustomModel<State> {
  private state: State;

  constructor(props: Props) {
    super();
    const { id, content, checked, defaultChecked } = props;
    this.state = {
      id: id || UUID.v4(),
      content,
      checked: checked || false,
      defaultChecked: defaultChecked || false,
    };
  }

  toJSON(): State {
    return this.state;
  }

  clone(): FormQuestionOptionModel {
    return new FormQuestionOptionModel(this.toJSON());
  }
}

export default FormQuestionOptionModel;
