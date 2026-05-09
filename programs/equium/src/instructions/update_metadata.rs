//! Admin-only. Updates Metaplex metadata URI; no-op stub until M2 brings in
//! anchor-spl Metaplex CPI.

use anchor_lang::prelude::*;

use crate::errors::EquiumError;
use crate::UpdateMetadata;

pub fn handler(ctx: Context<UpdateMetadata>, _new_uri: String) -> Result<()> {
    require!(
        !ctx.accounts.config.admin_renounced,
        EquiumError::AdminRenounced
    );
    // TODO(M2): CPI to mpl-token-metadata's update_metadata_accounts_v2.
    Ok(())
}
