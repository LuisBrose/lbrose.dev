export function LinkedinBadgeFallback() {
  return (
    <div className="absolute inset-0 z-10 flex flex-col rounded-[10px] bg-card px-4 py-3 text-card-foreground">
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <span className="inline-flex h-6 w-24 items-center justify-center rounded-md bg-[#0A66C2]/10 px-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-[#0A66C2] text-xs font-semibold leading-none text-white">
            in
          </span>
          <span className="ml-1 text-xs font-semibold text-[#0A66C2]">LinkedIn</span>
        </span>
      </div>

      <div className="mt-3 flex flex-1 flex-col gap-2.5">
        <a
          href="https://www.linkedin.com/in/luisbrose/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-14 w-14 overflow-hidden rounded-full bg-[#0A66C2]"
          aria-label="Open Luis Brose LinkedIn profile"
        >
          <img
            src="/profile_pic.jpg"
            alt="Luis Brose"
            className="h-full w-full object-cover"
          />
        </a>
        <div className="min-w-0 space-y-1">
          <a
            href="https://www.linkedin.com/in/luisbrose/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-base font-semibold leading-snug hover:underline"
          >
            Luis Brose
          </a>
          <p className="text-xs leading-snug text-muted-foreground">
            Software Developer &amp; M.Sc. Informatik Student
          </p>
          <a
            href="https://www.linkedin.com/company/intero-technologies-gmbh?trk=public-profile-badge-profile-badge_company-name"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-xs leading-snug text-muted-foreground hover:text-foreground hover:underline"
          >
            Intero Technologies – Odoo Gold Partner
          </a>
          <a
            href="https://www.linkedin.com/school/hochschulestralsund/?trk=public-profile-badge-profile-badge_school-name"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-xs leading-snug text-muted-foreground hover:text-foreground hover:underline"
          >
            Hochschule Stralsund
          </a>
        </div>
      </div>

      <div className="mt-2.5">
        <a
          href="https://www.linkedin.com/in/luisbrose/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-8 items-center justify-center rounded-full border border-[#0A66C2] px-4 text-sm font-medium text-[#0A66C2] hover:bg-[#0A66C2]/8"
        >
          View profile
        </a>
      </div>
    </div>
  )
}

