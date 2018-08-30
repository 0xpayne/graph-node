use components::EventProducer;
use data::schema::Schema;
use data::subgraph::{SubgraphManifest, SubgraphProviderError};
use tokio::prelude::*;

/// Events emitted by [SubgraphProvider](trait.SubgraphProvider.html) implementations.
#[derive(Clone, Debug)]
pub enum SubgraphProviderEvent {
    /// A subgraph was added to the provider.
    SubgraphAdded(SubgraphManifest),
    /// A subgraph with the given ID was removed from the provider.
    SubgraphRemoved(String),
}

/// Schema-only events emitted by a [SubgraphProvider](trait.SubgraphProvider.html).
#[derive(Clone, Debug)]
pub enum SchemaEvent {
    /// A subgraph with a new schema was added.
    SchemaAdded(Schema),
    /// A subgraph with the given name and id was removed.
    SchemaRemoved(String, String),
}

/// Common trait for subgraph providers.
pub trait SubgraphProvider:
    EventProducer<SubgraphProviderEvent> + EventProducer<SchemaEvent> + Send + Sync + 'static
{
    fn add(
        &self,
        name: String,
        link: String,
    ) -> Box<Future<Item = (), Error = SubgraphProviderError> + Send + 'static>;

    fn remove(
        &self,
        name_or_id: String,
    ) -> Box<Future<Item = (), Error = SubgraphProviderError> + Send + 'static>;
}
