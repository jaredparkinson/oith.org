import { formatGroupSelectors } from './formatGroupSelectors';

export async function hasSingleFormatGroup(element: Element): Promise<boolean> {
  return (
    Array.from(element.querySelectorAll(formatGroupSelectors)).filter(
      (childElement): boolean => {
        return !childElement.hasAttribute('marker');
      },
    ).length === 0
  );
}
