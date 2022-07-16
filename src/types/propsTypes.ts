import { ChangeEventHandler, MouseEventHandler } from "react";
import { SongData, SongLyrics } from "./apiResponse";

interface ButtonProps {
  type: string;
  disabled: boolean;
  eventHandler: MouseEventHandler<HTMLButtonElement>;
  text: string;
}

interface ContextSearch {
  inputChangeHandler: ChangeEventHandler<HTMLInputElement>;
  clickHandler: MouseEventHandler<HTMLButtonElement>;
  criteria: string;
}

interface SearchProps {
  clicked: boolean;
  found: boolean;
}

interface ResultProps {
  lyrics: SongLyrics[],
  tag: MetaDataProps,
  resultRef: React.MutableRefObject<HTMLDivElement | undefined>
}

type MetaDataProps = Omit<
  SongData,
  "status" | "durationMs" | "shareUrl" | "type" | "lyrics"
>;

export type {
  ButtonProps,
  ContextSearch,
  ResultProps,
  SearchProps,
  MetaDataProps,
};
