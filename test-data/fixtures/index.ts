import { mergeTests } from '@playwright/test';
import { test as pages } from './pagesFixture';
import { test as sizes } from './screenSizesFixture';

export const test = mergeTests(pages, sizes);