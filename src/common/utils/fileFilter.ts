import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';

type FileFilterCallback = (error: Error | null, acceptFile: boolean) => void;

export const xlsxFileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
) => {
  const fileExtension = file.originalname.split('.')[1];
  const validExtension = ['xlsx'];

  if (validExtension.includes(fileExtension)) {
    return callback(null, true);
  }

  return callback(
    new BadRequestException('xlsx확장자의 엑셀 파일만 가능합니다.'),
    false,
  );
};
