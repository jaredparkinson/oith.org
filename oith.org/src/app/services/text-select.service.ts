import { Injectable } from '@angular/core';
import { Chapter } from '../../../../oith.shared';

@Injectable({
  providedIn: 'root',
})
export class TextSelectService {
  public chapter: Chapter | undefined;
  public constructor() {}

  public init(chapter: Chapter): void {
    this.chapter = chapter;
  }

  public async getSelection(): Promise<void> {
    const onPageSelection = document.getSelection();

    if (onPageSelection) {
      const selectedRange = onPageSelection.getRangeAt(0);

      const startContainer = selectedRange.startContainer;
      const endContainer = selectedRange.endContainer;

      if (
        startContainer.nodeName === '#text' &&
        endContainer.nodeName === '#text'
      ) {
        await this.parseTextFTags(selectedRange, startContainer, endContainer);
      }
    }
  }

  private async parseTextFTags(
    selectedRange: Range,
    startContainer: Node,
    endContainer: Node,
  ): Promise<void> {
    if (startContainer.parentElement && endContainer.parentElement) {
      const startContainerID = startContainer.parentElement.getAttribute('vid');
      const endContainerID = endContainer.parentElement.getAttribute('vid');

      if (startContainerID && endContainerID) {
        if (startContainerID === endContainerID) {
          const verse = document.querySelector(
            `verse[guid=${startContainerID}]`,
          );
          const cc1 = startContainer.parentElement.getAttribute('cc');
          const cc2 = endContainer.parentElement.getAttribute('cc');
          if (verse && cc1 && cc2) {
            this.generateVerseFTags(
              verse,
              (cc1.split(',') as never) as [string, string],
              selectedRange.startOffset + 1,
              (cc2.split(',') as never) as [string, string],
              selectedRange.endOffset,
            );
          }
        } else {
          this.generateMultiVerseFTags(
            selectedRange,
            startContainer,
            startContainerID,
            endContainer,
            endContainerID,
          );
        }
      }
      console.log(`${startContainerID} ${endContainerID}`);
    }
  }
  private generateVerseFTags(
    verse: Element,
    cc1: [string, string],
    offset1: number,
    cc2: [string, string],
    offset2: number,
  ): void {
    const s = parseInt(cc1[0], 10) + offset1;
    const e = parseInt(cc2[0]) + offset2 + 1;
    alert(verse.textContent ? verse.textContent.substring(s, e) : '');
  }
  private generateMultiVerseFTags(
    selectedRange: Range,
    startContainer: Node,
    startContainerID: string,
    endContainer: Node,
    endContainerID: string,
  ): void {
    const verseElements = Array.from(document.querySelectorAll('verse'));
    const verse = document.querySelector(`verse[guid=${startContainerID}]`);
    const verse2 = document.querySelector(`verse[guid=${endContainerID}]`);
    if (
      verse &&
      verse2 &&
      startContainer.parentElement &&
      endContainer.parentElement
    ) {
      console.log(verseElements.indexOf(verse));
      console.log(verseElements.indexOf(verse2));

      const cc1 = startContainer.parentElement.getAttribute('cc');
      const cc2 = endContainer.parentElement.getAttribute('cc');

      if (cc1 && cc2) {
        const tc = verse.textContent;
        const tc2 = verse2.textContent;

        this.generateVerseFTags(
          verse,
          (cc1.split(',') as never) as [string, string],
          selectedRange.startOffset,
          [(tc.length - 1).toString(), ''],
          0,
        );
        this.generateVerseFTags(
          verse2,
          [(-1).toString(), ''],
          0,
          (cc2.split(',') as never) as [string, string],
          selectedRange.endOffset,
        );
      }
      verseElements
        .slice(verseElements.indexOf(verse) + 1, verseElements.indexOf(verse2))
        .map(
          (element): void => {
            const tc = element.textContent;
            if (tc) {
              this.generateVerseFTags(
                element,
                ['-1', '0'],
                0,
                [(tc.length - 1).toString(), ''],
                0,
              );
            }
          },
        );
      console.log();
    }
  }
  /**
   * destroy
   */
  public destroy(): void {
    this.chapter = undefined;
  }
}
