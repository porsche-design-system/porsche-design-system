# Spacing

<TableOfContents></TableOfContents>

## Spacing system
The Porsche Design System spacing values are based on an eighth system:  
`4 | 8 | 16 | 24 | 32 | 40 | 48 | 56 | 64 | 72 | 80`

For every unit there is an equivalent `SCSS` variable which has to be additionally installed with the `SCSS utility package` provided in an extra repository.
**[Read installation instructions for the Porsche Design System SCSS utils package](utilities/introduction)**


### Overview of available spacings

| SCSS variable 	| PX     	| REM 	|  VISUALIZATION     	                    | LAYOUT SPACING |
|-------------------|-----------|-------|-------------------------------------------| ---- |
| `$p-spacing-4`  	| 4 px  	| 0.25 	| ![spacing 4](./assets/spacing-4.png)      |   x-small |   
| `$p-spacing-8`  	| 8 px  	| 0.5  	| ![spacing 8](./assets/spacing-8.png)      |   small | 
| `$p-spacing-16` 	| 16 px 	| 1    	| ![spacing 16](./assets/spacing-16.png)    |    medium |
| `$p-spacing-24` 	| 24 px 	| 1.5  	| ![spacing 24](./assets/spacing-24.png)    |   - | 
| `$p-spacing-32` 	| 32 px 	| 2    	| ![spacing 32](./assets/spacing-32.png)    |   large | 
| `$p-spacing-40` 	| 40 px 	| 2.5  	| ![spacing 40](./assets/spacing-40.png)    |   - | 
| `$p-spacing-48` 	| 48 px 	| 3    	| ![spacing 48](./assets/spacing-48.png)    |   x-large | 
| `$p-spacing-56` 	| 56 px 	| 3.5  	| ![spacing 56](./assets/spacing-56.png)    |   - | 
| `$p-spacing-64` 	| 64 px 	| 4    	| ![spacing 64](./assets/spacing-64.png)    |   - | 
| `$p-spacing-72` 	| 72 px 	| 4.5  	| ![spacing 72](./assets/spacing-72.png)    |  - |  
| `$p-spacing-80` 	| 80 px 	| 5    	| ![spacing 80](./assets/spacing-80.png)    |   xx-large |




## Layout spacings

To be more consistent, there is a reduced set of spacings which should be used as main layout spacings (e.g. for vertical spacings between elements).  

### Overview of reduced layout spacings

| SCSS variable                | PX        | REM   | VISUALIZATION                            |
|------------------------------|-----------|-------|------------------------------------------|
| `$p-layout-x-small`          | 4 px      | 0.25  | ![spacing xs](./assets/spacing-4.png)    |     
| `$p-layout-small`            | 8 px      | 0.5   | ![spacing s](./assets/spacing-8.png)     |    
| `$p-layout-medium`           | 16 px     | 1     | ![spacing m](./assets/spacing-16.png)    |    
| `$p-layout-large`            | 32 px     | 2     | ![spacing l](./assets/spacing-32.png)    |    
| `$p-layout-x-large`          | 48 px     | 3     | ![spacing xl](./assets/spacing-48.png)   |    
| `$p-layout-xx-large`         | 80 px     | 5     | ![spacing xxl](./assets/spacing-80.png)  |    