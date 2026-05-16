export type DiffTokenType = {
  value: string;

  type: "same" | "added" | "removed";
};

export const generateTokenDiff = (
  oldText: string,
  newText: string
): {
  leftDiff: DiffTokenType[];
  rightDiff: DiffTokenType[];
} => {
  const oldTokens = oldText
    .trim()
    .split(/\s+/);

  const newTokens = newText
    .trim()
    .split(/\s+/);

  const dp: number[][] = Array(
    oldTokens.length + 1
  )
    .fill(null)
    .map(() =>
      Array(
        newTokens.length + 1
      ).fill(0)
    );

  for (
    let i = 1;
    i <= oldTokens.length;
    i++
  ) {
    for (
      let j = 1;
      j <= newTokens.length;
      j++
    ) {
      if (
        oldTokens[i - 1] ===
        newTokens[j - 1]
      ) {
        dp[i][j] =
          dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(
          dp[i - 1][j],
          dp[i][j - 1]
        );
      }
    }
  }

  const leftDiff: DiffTokenType[] =
    [];

  const rightDiff: DiffTokenType[] =
    [];

  let i = oldTokens.length;

  let j = newTokens.length;

  while (i > 0 && j > 0) {
    if (
      oldTokens[i - 1] ===
      newTokens[j - 1]
    ) {
      leftDiff.unshift({
        value: oldTokens[i - 1],
        type: "same",
      });

      rightDiff.unshift({
        value: newTokens[j - 1],
        type: "same",
      });

      i--;

      j--;
    } else if (
      dp[i - 1][j] >=
      dp[i][j - 1]
    ) {
      leftDiff.unshift({
        value: oldTokens[i - 1],
        type: "removed",
      });

      i--;
    } else {
      rightDiff.unshift({
        value: newTokens[j - 1],
        type: "added",
      });

      j--;
    }
  }

  while (i > 0) {
    leftDiff.unshift({
      value: oldTokens[i - 1],
      type: "removed",
    });

    i--;
  }

  while (j > 0) {
    rightDiff.unshift({
      value: newTokens[j - 1],
      type: "added",
    });

    j--;
  }

  return {
    leftDiff,
    rightDiff,
  };
};