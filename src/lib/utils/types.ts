export type File = {
  name: string;
  type: string;
  size: number;
  lastModified: Date;
  parent?: Directory;
};

export type Directory = {
  name: string;
  parent?: Directory;
  files: File[];
  subdirectories: Directory[];
};
