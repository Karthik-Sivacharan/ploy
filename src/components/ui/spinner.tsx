import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { icons } from "@/lib/icons"

function Spinner({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span role="status" aria-label="Loading" className={cn("inline-flex size-4 animate-spin", className)} {...props}>
      <HugeiconsIcon icon={icons["loader"]} size={16} color="currentColor" />
    </span>
  )
}

export { Spinner }
