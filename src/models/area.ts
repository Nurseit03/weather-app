export interface IArea {
  id?: string | null;
  parent_id?: string | null;
  areas?: IArea[];
  name?: string;
}
