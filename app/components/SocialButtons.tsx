export function SocialButtons({ label = 'Use email to continue' }: { label?: string }) {
  return (
    <div className="text-center text-sm text-slate-600">
      {label}
    </div>
  )
}
