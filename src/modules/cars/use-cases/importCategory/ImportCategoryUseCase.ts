import csvParse from "csv-parser";
import fs from "fs";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  loadCategories(file: Express.Multer.File): IImportCategory[] {
    const stream = fs.createReadStream(file.path);
    const categories: IImportCategory[] = [];
    const parseFile = csvParse();

    stream.pipe(parseFile);

    parseFile.on("data", async (line) => {
      const [name, description] = line;
      categories.push({
        name,
        description
      });
    });

    return categories;
  }

  execute(file: Express.Multer.File): void {
    const categories = this.loadCategories(file);
    categories.map(async (category) => {
      const { name, description } = category;
      const existsCategory = this.categoriesRepository.findByName(name);
      if (!existsCategory) {
        this.categoriesRepository.create({ name, description });
      }
    });
  }
}

export { ImportCategoryUseCase };
