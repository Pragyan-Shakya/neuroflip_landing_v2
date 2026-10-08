export type ExamKey = "NEET_PG" | "INI_CET" | "FMGE";

/** [coverage %, total topics so far, topics added in this milestone] */
export type MilestoneRow = readonly [string, string, string];
/** [coverage %, title, body] */
export type MilestoneCopy = readonly [string, string, string];

export interface ExamData {
  label: string;
  subtitle: string;
  rows: readonly MilestoneRow[];
  copy: readonly MilestoneCopy[];
}

export const EXAM_KEYS: readonly ExamKey[] = ["NEET_PG", "INI_CET", "FMGE"];

export const EXAM_DATA: Record<ExamKey, ExamData> = {
  NEET_PG: {
    label: "NEET-PG",
    subtitle: "NEET-PG · 10 milestones · total topics so far",
    rows: [
      ["10%", "29", "29"], ["20%", "67", "38"], ["30%", "118", "51"], ["40%", "181", "63"], ["50%", "258", "77"],
      ["60%", "348", "90"], ["70%", "452", "104"], ["80%", "590", "138"], ["90%", "790", "200"], ["100%", "1162", "372"],
    ],
    copy: [
      ["10%", "Start with 29 topics.", "These 29 topics cover the first 10% of what past NEET-PG questions have tested."],
      ["20%", "Add 38 topics to reach 20%.", "Your revision set now has 67 topics."],
      ["30%", "Add 51 topics to reach 30%.", "Your revision set now has 118 topics."],
      ["40%", "Add 63 topics to reach 40%.", "Your revision set now has 181 topics."],
      ["50%", "Add 77 topics to reach halfway.", "Your revision set now has 258 topics."],
      ["60%", "Add 90 topics to reach 60%.", "Your revision set now has 348 topics."],
      ["70%", "Add 104 topics to reach 70%.", "Your revision set now has 452 topics."],
      ["80%", "Add 138 topics to reach 80%.", "Your revision set now has 590 topics."],
      ["90%", "Add 200 topics to reach 90%.", "Your revision set now has 790 topics."],
      ["100%", "Finish the full past-question set with 1,162 topics.", "These are all topics found in the current NEET-PG past-question data."],
    ],
  },
  INI_CET: {
    label: "INI-CET",
    subtitle: "INI-CET · 10 milestones · total topics so far",
    rows: [
      ["10%", "35", "35"], ["20%", "81", "46"], ["30%", "136", "55"], ["40%", "204", "68"], ["50%", "286", "82"],
      ["60%", "386", "100"], ["70%", "511", "125"], ["80%", "655", "144"], ["90%", "844", "189"], ["100%", "1142", "298"],
    ],
    copy: [
      ["10%", "Start with 35 topics.", "These 35 topics cover the first 10% of what past INI-CET questions have tested."],
      ["20%", "Add 46 topics to reach 20%.", "Your revision set now has 81 topics."],
      ["30%", "Add 55 topics to reach 30%.", "Your revision set now has 136 topics."],
      ["40%", "Add 68 topics to reach 40%.", "Your revision set now has 204 topics."],
      ["50%", "Add 82 topics to reach halfway.", "Your revision set now has 286 topics."],
      ["60%", "Add 100 topics to reach 60%.", "Your revision set now has 386 topics."],
      ["70%", "Add 125 topics to reach 70%.", "Your revision set now has 511 topics."],
      ["80%", "Add 144 topics to reach 80%.", "Your revision set now has 655 topics."],
      ["90%", "Add 189 topics to reach 90%.", "Your revision set now has 844 topics."],
      ["100%", "Finish the full past-question set with 1,142 topics.", "These are all topics found in the current INI-CET past-question data."],
    ],
  },
  FMGE: {
    label: "FMGE",
    subtitle: "FMGE · 10 milestones · total topics so far",
    rows: [
      ["10%", "38", "38"], ["20%", "86", "48"], ["30%", "142", "56"], ["40%", "206", "64"], ["50%", "287", "81"],
      ["60%", "379", "92"], ["70%", "491", "112"], ["80%", "634", "143"], ["90%", "833", "199"], ["100%", "1240", "407"],
    ],
    copy: [
      ["10%", "Start with 38 topics.", "These 38 topics cover the first 10% of what past FMGE questions have tested."],
      ["20%", "Add 48 topics to reach 20%.", "Your revision set now has 86 topics."],
      ["30%", "Add 56 topics to reach 30%.", "Your revision set now has 142 topics."],
      ["40%", "Add 64 topics to reach 40%.", "Your revision set now has 206 topics."],
      ["50%", "Add 81 topics to reach halfway.", "Your revision set now has 287 topics."],
      ["60%", "Add 92 topics to reach 60%.", "Your revision set now has 379 topics."],
      ["70%", "Add 112 topics to reach 70%.", "Your revision set now has 491 topics."],
      ["80%", "Add 143 topics to reach 80%.", "Your revision set now has 634 topics."],
      ["90%", "Add 199 topics to reach 90%.", "Your revision set now has 833 topics."],
      ["100%", "Finish the full past-question set with 1,240 topics.", "These are all topics found in the current FMGE past-question data."],
    ],
  },
};
