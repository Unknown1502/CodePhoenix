export type GithubExportResult = {
  repoName: string
  createUrl?: string
  summary: string
}

// Stub that prepares the payload for creating a GitHub repo and commit.
// This does NOT call GitHub APIs directly—use a server-side implementation
// with auth tokens to perform the actual repo creation and push.
export function prepareGithubExportPayload(projectName: string, files: {path: string; content: string}[]): GithubExportResult {
  // Safe default repo name
  const repoName = projectName.replace(/[^a-z0-9-]/gi, '-').toLowerCase()
  const createUrl = `https://github.com/new?name=${encodeURIComponent(repoName)}`

  return {
    repoName,
    createUrl,
    summary: `Prepared ${files.length} files for export to GitHub. Use a backend service with an OAuth token to create the repo and push commits.`
  }
}
