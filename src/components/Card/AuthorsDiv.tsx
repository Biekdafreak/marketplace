import { t } from "i18next";
import React from "react";
import { CUSTOM_APP_PATH } from "../../constants";
import { getOwnerLogin } from "../../logic/Utils";
import type { Author } from "../../types/marketplace-types";

// `owner` is the owner of the item's repo, the only author whose name opens a creator page
const AuthorsDiv = (props: { authors: Author[]; owner?: string }) => {
  // Add a div with author links inside
  const authorsDiv = (
    <div className="marketplace-card__authors">
      {props.authors.map((author) => {
        const login = getOwnerLogin(author, props.owner);
        // Guessed links ("github.com/<name>") can be a stranger's account or a dead page, so they're not shown
        if (!login && author.inferredUrl) {
          return (
            <span className="marketplace-card__author" dir="auto" key={author.name + author.url}>
              {author.name}
            </span>
          );
        }
        // Other authors keep linking to their own page
        return (
          <a
            title={login ? t("authorPage.viewAll", { name: author.name }) : author.name}
            className="marketplace-card__author"
            href={login ? `https://github.com/${login}` : author.url}
            draggable="false"
            dir="auto"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              if (!login) return;

              e.preventDefault();
              Spicetify.Platform.History.push({ pathname: `${CUSTOM_APP_PATH}/author/${login}`, state: { name: author.name } });
            }}
            key={author.name + author.url}
          >
            {author.name}
          </a>
        );
      })}
    </div>
  );

  return authorsDiv;
};

export default AuthorsDiv;
