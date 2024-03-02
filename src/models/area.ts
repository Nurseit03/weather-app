export interface IArea {
  id?: string | null;
  parent_id?: string | null;
  areas?: IArea[];
  name?: string;
}

export type AreaType = {
  country?: IArea;
  state?: IArea;
  city?: IArea;
};
