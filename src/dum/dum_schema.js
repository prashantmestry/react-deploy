export let dum_schema = {
    "schema_name": "Combined - Sample 2",
    "schema_type": "default_schema",
    "schema_id": 901,
    "user_id": "kumargou",
    "scope": "private",
    "schema": [
        {
            "frml_id": "Ac_tx_Rate",
            "frml_str": "Tax Rate 1",
            "allow_child": false,
            "type": "parent",
            "group_source": "computedRatioList",
            "group_id": "Ratios"
        },
        {
            "frml_id": "parent_521",
            "frml_str": "Parent One",
            "allow_child": true,
            "type": "parent",
            "group_source": "parent",
            "group_id": null,
            "children": [
                {
                    "frml_id": "pl_ann_012",
                    "frml_str": "Advertising Revenue",
                    "group_source": "stmt_frml_map",
                    "group_id": 2,
                    "type": "child",
                },
                {
                    "frml_id": "pl_ann_045",
                    "frml_str": "Less: Consumer Benefit Account",
                    "group_source": "stmt_frml_map",
                    "group_id": 2,
                    "type": "child",
                }
            ]
        },
        {
            "frml_id": "parent_576",
            "frml_str": "Parent Two",
            "allow_child": true,
            "type": "parent",
            "group_source": "parent",
            "group_id": null,
            "children": [
                {
                    "frml_id": "CASH",
                    "frml_str": "CCE",
                    "group_source": "computedRatioList",
                    "group_id": "Ratios",
                    "type": "child"
                },
                {
                    "frml_id": "pl_ann_045",
                    "frml_str": "Less: Consumer Benefit Account",
                    "group_source": "stmt_frml_map",
                    "group_id": 2,
                    "type": "child",
                }
            ]
        }
    ]
}