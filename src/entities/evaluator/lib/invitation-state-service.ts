import InvitationModel from '../model/invitation';

class InvitationStateService {
  static add(prev: InvitationModel[], invitation: InvitationModel): InvitationModel[] {
    return [...prev, invitation];
  }

  static remove(prev: InvitationModel[], id: string): InvitationModel[] {
    return prev.filter(item => item.getValue('id') !== id);
  }
}

export default InvitationStateService;
