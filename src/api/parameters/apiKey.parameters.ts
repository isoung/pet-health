import { IBaseParameters } from 'api/parameters/base.parameters';

export interface IAPIKeyParameters extends IBaseParameters {
  userId: string;
}
