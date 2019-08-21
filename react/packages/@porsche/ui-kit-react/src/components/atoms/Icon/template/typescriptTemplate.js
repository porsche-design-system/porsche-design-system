function typescriptTemplate({ template }, opts, { imports, componentName, props, jsx, exports }) {
    const typescriptTpl = template.smart({ plugins: ["typescript"] })
    return typescriptTpl.ast`
      import * as React from 'react';
      const ${componentName} = (props: React.SVGProps<SVGSVGElement>) => ${jsx};
      export default ${componentName};
    `
}
module.exports = typescriptTemplate
