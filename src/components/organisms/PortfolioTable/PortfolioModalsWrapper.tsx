import { FundDetailModal } from "@/components/molecules/Modals/FundDetailModal";
import { FundBuyModal } from "@/components/molecules/Modals/FundBuyModal";
import { Portfolio } from "@/features/portfolio/types/portfolio";
import { useFund } from "@/features/fund/hooks/useFund";
import { PortfolioAction } from ".";
import { FundSellModal } from "@/components/molecules/Modals/FundSellModal";
import { FundTransferModal } from "@/components/molecules/Modals/FundTransferModal/FundTransferModal";

interface PortfolioModalsProps {
  type: PortfolioAction | null;
  selectedItem: Portfolio | null;
  onClose: () => void;
  allPortfolioItems: Portfolio[];
}

export const PortfolioModals = ({
  type,
  selectedItem,
  onClose,
  allPortfolioItems,
}: PortfolioModalsProps) => {
  const shouldFetchFund =
    (type === PortfolioAction.Detail || type === PortfolioAction.Buy) &&
    !!selectedItem;
  const { data: fundData, isLoading } = useFund(
    shouldFetchFund ? selectedItem!.id : null,
  );

  const fund = fundData?.data || null;

  if (type === PortfolioAction.Buy && selectedItem) {
    if (isLoading) return null;
    if (!fund) return null;
    return <FundBuyModal isOpen={true} onClose={onClose} fund={fund} />;
  }

  if (type === PortfolioAction.Sell && selectedItem) {
    return (
      <FundSellModal
        isOpen={true}
        onClose={onClose}
        portfolioItem={selectedItem}
      />
    );
  }

  if (type === PortfolioAction.Transfer && selectedItem) {
    return (
      <FundTransferModal
        isOpen={true}
        onClose={onClose}
        sourceFund={selectedItem}
        allFunds={allPortfolioItems}
      />
    );
  }

  if (type === PortfolioAction.Detail && selectedItem) {
    if (isLoading) return null;
    if (!fund) return null;
    return <FundDetailModal isOpen={true} onClose={onClose} fund={fund} />;
  }

  return null;
};
