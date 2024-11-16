<script lang="ts">
    interface FooterLink {
      href: string;
      label: string;
      target?: string;
    }
  
    const footerLinks: FooterLink[] = [
      
      { href: "/imprint", label: "imprint" },
      { href: "/privacy", label: "privacy" },
      { href: "https://bsky.app/profile/afaik.fyi", label: "Bluesky", target: "_blank" },
    ];
  </script>
  
  <footer class="mt-20 border-t border-border">
    <div class="mx-auto max-w-7xl px-4 py-8 flex justify-end">
      <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm text-muted-foreground items-end">
        {#each footerLinks as link}
          <a 
            href={link.href} 
            class="hover:text-foreground transition-colors"
            target={link.target || "_self"}
            rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
          >
            {link.label}
          </a>
        {/each}
      </div>
    </div>
  </footer>