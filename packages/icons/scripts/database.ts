// TODO: this file should be part of icon platform itself

import { SVG_MANIFEST } from '@porsche-design-system/icons';
import database from './../database/icons.json';
import * as fs from 'fs';
import * as path from 'path';

interface IconDatabase {
  icons: [
    {
      id: string;
      title: string;
      description: string;
      brand: boolean;
      vehicle: boolean;
      tags: string[];
      filename: string;
      public: boolean;
    }?
  ];
}

const syncIconDatabase = (): void => {

  const newDatabase: IconDatabase = {'icons': []};
  const iconsAdded: string[] = [];
  const iconsUpdated: string[] = [];
  const iconsDeleted: string[] = [];

  // add or update icons
  for (const [name, file] of Object.entries(SVG_MANIFEST)) {

    const icon = database.icons.find(element => element && element.id === name);

    if (icon !== undefined) {
      if (icon.filename !== file) iconsUpdated.push(name);
      newDatabase.icons.push({
        id: name,
        title: icon.title,
        description: icon.description,
        brand: icon.brand,
        vehicle: icon.vehicle,
        tags: icon.tags,
        filename: file,
        public: icon.public
      });
    } else {
      iconsAdded.push(name);
      newDatabase.icons.push({
        id: name,
        title: name,
        description: 'Short description',
        brand: false,
        vehicle: false,
        tags: [],
        filename: file,
        public: true
      });
    }
  }

  // check for deleted icons
  for (const icon of database.icons) {
    if (newDatabase.icons.find(element => element && element.id === icon.id) === undefined) {
      iconsDeleted.push(icon.id);
    }
  }

  fs.writeFileSync(path.normalize('./database/icons.json'), JSON.stringify(newDatabase));

  console.log(`
Added icons: ${iconsAdded.length}x (${iconsAdded.join(', ')})

Updated icons: ${iconsUpdated.length}x (${iconsUpdated.join(', ')})

Deleted icons: ${iconsDeleted.length}x (${iconsDeleted.join(', ')})
  `.trim());
};

syncIconDatabase();
