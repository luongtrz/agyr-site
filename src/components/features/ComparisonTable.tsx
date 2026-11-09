import { comparisonRows } from './data';

export function ComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-md border border-white/10">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <caption className="sr-only">
          Comparison between agyr native CLI swapper and proxy routers
        </caption>
        <thead>
          <tr className="border-b border-white/10 bg-surface">
            <th
              scope="col"
              className="py-3.5 px-4 sm:px-6 text-xs font-semibold uppercase tracking-wider text-muted w-[28%]"
            >
              Criteria
            </th>
            <th
              scope="col"
              className="py-3.5 px-4 sm:px-6 text-xs font-semibold uppercase tracking-wider text-ink border-l border-emerald/30 bg-emerald/[0.03] w-[36%]"
            >
              agyr (native CLI swapper)
            </th>
            <th
              scope="col"
              className="py-3.5 px-4 sm:px-6 text-xs font-semibold uppercase tracking-wider text-muted w-[36%]"
            >
              Proxy routers (e.g. 9router)
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {comparisonRows.map((row) => (
            <tr key={row.id} className="hover:bg-white/[0.02] transition-colors">
              <th
                scope="row"
                className="py-4 px-4 sm:px-6 align-top font-normal text-left"
              >
                <div className="font-semibold text-ink text-sm sm:text-base">
                  {row.title}
                </div>
                <div className="text-xs sm:text-sm text-dim mt-0.5 leading-relaxed">
                  {row.subtitle}
                </div>
              </th>
              <td className="py-4 px-4 sm:px-6 align-top text-sm sm:text-base text-slate-200 border-l border-emerald/30 bg-emerald/[0.03] leading-relaxed">
                {row.agyr.description}
              </td>
              <td className="py-4 px-4 sm:px-6 align-top text-sm sm:text-base text-muted leading-relaxed">
                {row.proxy.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
