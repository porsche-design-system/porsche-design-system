# Porsche Design System Crawler

Porsche Design System Crawler is designed to crawl over all relevant portfolio frontpages and make report about:

- Used PDS version(s) and PDS prefixes
- Used PDS components and configuration per component
- PDS components and properties which are never used
- Aggregated data - amout of PDS components and properties
- Information about PDS components' slot's contents (children)
- Information about parent PDS component

## Start Crawler

```
yarn start:crawler
```

Reports will be located in `reports` folder.

## Run e2e tests

```
yarn test:e2e
```

## Configuration

You can configure the crawler, the config is located in `constants.ts`

## Technical Architecture

In easy words, crawler does two things:

1. First crawl the websites (page evaluate) in order to get the "Raw Data"
2. Aggregate the "Raw Data" - put it into format we want

- `crawl-websites.ts` - main logic, goes over all the websites, fetches data and creates reports
- `evaluate-page.ts` - everything what happens inside of Puppeteer's _page.evaluate_: getting PDS Dom Elements with
  their configurations and building Raw Data

- `helpers/convert-data-helper.ts` - helper functions for converting data into other format
- `helpers/conunt-data-helper.ts` - helper functions for counting components' and properties' amount
- `helpers/fs-helper.ts` - helper functions for working with File System (saving & deleting reports)
