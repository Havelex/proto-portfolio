export type File = {
  name: string;
  type: string;
  meta: {
    size: number;
    lineCount: number;
    symbolCount: number;
  };
  lastModified: Date;
  parent?: Directory;
};

export type Directory = {
  name: string;
  parent?: Directory;
  files: File[];
  subdirectories: Directory[];
};
