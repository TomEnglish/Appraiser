erDiagram
    appraisal_unified {
        string appraisal_id PK
        string job_status
        text appraisal_remarks
        string appraisal_ordered_by
        string report_type
        string client_id
        string client_name
        string title
        string client_first_name
        string client_middle_name
        string client_last_name
        string client_address
        string client_city
        text client_remarks
        string client_contact
        string mr_ms
        string client_stat
        string client_zip
        string client_phone
        string client_email
        string client_name_2
        string property_owner
        datetime report_date
        string appraisal_type
        string job_status_2
        string assigned_appraiser
        string comps_cart
    }

    appraisal_log {
        string appraisal_id PK "FK to appraisal_unified.appraisal_id"
        datetime initiated_on
        string initiated_by
        datetime last_changed
        string last_change_by
        string appraisal_status
    }

    appraisal_contacts {
        string id PK
        string appraisal_id FK
        string contact_company
        datetime market_rates_contact_date_specific
        string space_types
        text market_rent_dollar_sf_remarks
    }

    appraisal_general {
        string general_id PK "Primary key for appraisal_general"
        string appraisal_id FK
        string job_status
        text appraisal_remarks
        string appraisal_ordered_by
        string report_type
    }

    appraisal_jobs {
        string job_id PK "Primary key for appraisal_jobs"
        string appraisal_id FK
        string client_id
        string client_name
        string title
        string client_first_name
        string client_middle_name
        string client_last_name
        string client_address
        string client_city
        text client_remarks
        string client_contact
        string mr_ms
        string client_stat
        string client_zip
        string client_phone
        string client_email
        string client_name_2
        string property_owner
        datetime report_date
        string appraisal_type
        string job_status "Note: also in appraisal_unified"
        string job_status_2 "Note: also in appraisal_unified"
        string assigned_appraiser "Note: also in appraisal_unified"
        string comps_cart "Note: also in appraisal_unified"
    }

    attachments {
        string id PK
        string appraisal_id FK
        text attach_here
    }

    bid {
        string bid_number PK
        string appraisal_id FK
        string bid_status
        string source_of_bid
        float bid_amount_1
        int bid_time_1_days
        float bid_amount_2
        int bid_time_2_days
    }

    building_area_breakdown {
        string breakdown_id PK
        string appraisal_id FK
        string building_name
        int year_built
        float gba
        string rentable_area_construction_quality
        string building_condition
        text construction_description
        int sort_order
        string property_id
    }

    building_finish {
        string id PK
        string appraisal_id FK
        string construction_quality
        string construction_class
        text construction_description
        string building_condition
        string exterior_walls
        string interior_wall_type
        string foundation_type
        text additional_building_info
        string roof_type
        string roof_material
        string ceiling
        string air_conditioning_type
        text roof_and_hvac_comments
        string floor_cover
        string lighting
    }

    building {
        string id PK
        string appraisal_id FK
        string building_name
        float gba
        string gba_source
        float rentable_area
        string rentable_area_source
        float building_footprint_area_sf
        float ancillary_area_sf
        text ancillary_area_description
        float ceiling_height
        string current_use
        int year_built
        text year_built_comments
        boolean property_renovations_flag
        int last_renovation_year
        int number_of_buildings
        int number_of_stories
        int number_units
        float percent_office
        float office_area_sf
        string tenancy
        string occupancy_type
        string predominant_lease_type
        text project_amenities
        int number_of_parking_spaces
        text parking_description
        boolean conforms_to_parking_standards
    }

    dates {
        string id PK
        string appraisal_id FK
        datetime date_booked
        datetime date_due
        datetime date_inspected
        datetime estimated_date_of_construction_completion
        datetime estimated_date_of_stabilization
        datetime date_delivered
        datetime report_date
        datetime market_rates_as_of
        datetime revised_due_date
    }

    file_info {
        string id PK
        string appraisal_id FK
        string property_owner
        string doing_business_as
        string client_file_number
        string internal_file_number
        string appraiser_1
        string appraiser_2
        text authors_perspective
        boolean subject_appraised_in_the_last_3_years
        text appraiser_1_prior_services
        text appraiser_2_prior_services
    }

    invoice {
        string invoice_number PK
        string appraisal_id FK
        float retainer
        float appraisal_fee
        datetime final_invoice_date
        float final_invoice_amount
        string valuation
        datetime date_paid
        float amount_paid
        float amount_due
    }

    land {
        string id PK
        string appraisal_id FK
        string tax_parcel_number
        float land_acres
        float land_sq_ft
        string land_size_source
        float land_to_building_ratio
        float surplus_land_acres
        float surplus_land_area_sf
        text surplus_land_area_desc
        string primary_street_name
        string secondary_street_name
        float depth_feet
        string zoning_jurisdiction
        string zoning_code
        text zoning_comments
        string conformity_conclusion
        string access
        string shape
        string dimensions
        string visibility
        string corner_or_interior
        boolean encumbrances_easements_flag
        text encumbrances_description
        text flood_plain_description
        text utilities_description
        text sewer_description
        text water_description
        text site_improvements
        text additional_site_info
        float excess_land_area_sf
        text excess_land_area_desc
        float usable_land_acres
        float usable_land_area_sf
        int number_of_lots "Typo in original: 'lost' -> 'lots'?"
        float primary_frontage_feet
        float secondary_frontage_feet
        text zoning_description
        string general_plan_designation
        boolean property_on_ground_lease_flag
        boolean in_flood_plain_flag
        float flood_area_percent
        string flood_zone
        string flood_map_number
        datetime flood_map_effective_date
        text gas_description
    }

    location {
        string property_id PK
        string appraisal_id FK
        string property_name
        string address
        string city_municipality
        string parish
        string state
        string zip_code
        string msa
        float map_latitude
        float map_longitude
        text legal_description
        text additional_location_info
        boolean inside_city_limits
        string section_township_range
        string block
        string lot
        string property_use
        string property_originator
        datetime property_entry_date
        string mls_id
        string former_id
        boolean subject_property_flag
    }

    premises {
        string id PK
        string appraisal_id FK
        text hypothetical_condition_1
        text hypothetical_condition_2
        text extraordinary_assumption_1
        text extraordinary_assumption_2
        text extraordinary_assumption_2_2
    }

    prior_sale {
        string id PK
        string appraisal_id FK
        datetime prior_sale_date
        float prior_sale_amount
        string prior_sale_buyer
        string prior_sale_seller
        text prior_sale_comments
    }

    property {
        string id PK
        string appraisal_id FK
        string occupancy_at_inspection
        string inspected_by
        string current_or_proposed
        int effective_age
        text deferred_maintenance_statement
        int total_economic_life
        string functional_utilities
        string overall_rating
    }

    remarks {
        string id PK
        string appraisal_id FK
        text property_remarks
    }

    scope_of_work {
        string id PK
        string appraisal_id FK
        text appraisal_problem
        string intended_user
        string intended_use
        text highest_and_best_use_as_improved
        text highest_and_best_use_as_vacant
        text property_identification
        text property_inspection
        text zoning_concerns
        text market_analysis
        text info_not_available_1
        text info_not_available_2
        boolean land_only_appraisal_flag
        text cost_approach_reason
        boolean use_sales_comparison
        text sales_comparison_approach_reason
        boolean use_income_approach
        text income_approach_reason
        string primary_approach
        text consideration_of_approach_weighting
    }

    taxes {
        string tax_record_id PK
        string appraisal_id FK
        string tax_parcel_no_auto_calc
        int tax_year
        float tax_land_value
        float tax_building_value
        float tax_market_value
        float tax_assess_ratio
        float assess_value
        float taxable_value
        float tax_rate
        string tax_rate_per
        float tax_amount
        float special_assessments
        float taxes_total
        string payment_status
        string property_id "Possible FK to location.property_id or building_area_breakdown.property_id"
    }

    user_defined_fields {
        string id PK
        string appraisal_id FK
        float listing_price
        float under_contract_price
        text user_defined_memo_1
        float land_value_dollar_psf
        datetime user_defined_date_1
    }

    valuation {
        string valuation_id PK
        string appraisal_id FK
        string value_type
        string value_premise
        string value_perspective
        string interest_appraised
        datetime effective_date
        string indicated_value_market_time
        int exposure_time_months
        int exposure_time_days
    }

    report_utilities {
        string appraisal_id PK "FK to appraisal_unified.appraisal_id"
        boolean intro_disclaimer
        boolean process_description
        boolean outro_disclaimer
        boolean scope_of_work_summary
        boolean certification_statement
        boolean fineprint
        boolean assumptions_and_limiting_conditions
    }

    appraisal_unified ||--|| appraisal_log : "has log"
    appraisal_unified ||--o{ appraisal_contacts : "details"
    appraisal_unified ||--o{ appraisal_general : "details"
    appraisal_unified ||--o{ appraisal_jobs : "details"
    appraisal_unified ||--o{ attachments : "details"
    appraisal_unified ||--o{ bid : "details"
    appraisal_unified ||--o{ building_area_breakdown : "details"
    appraisal_unified ||--o{ building_finish : "details"
    appraisal_unified ||--o{ building : "details"
    appraisal_unified ||--o{ dates : "details"
    appraisal_unified ||--o{ file_info : "details"
    appraisal_unified ||--o{ invoice : "details"
    appraisal_unified ||--o{ land : "details"
    appraisal_unified ||--o{ location : "details"
    appraisal_unified ||--o{ premises : "details"
    appraisal_unified ||--o{ prior_sale : "details"
    appraisal_unified ||--o{ property : "details"
    appraisal_unified ||--o{ remarks : "details"
    appraisal_unified ||--o{ scope_of_work : "details"
    appraisal_unified ||--o{ taxes : "details"
    appraisal_unified ||--o{ user_defined_fields : "details"
    appraisal_unified ||--o{ valuation : "details"
    appraisal_unified ||--|| report_utilities : "has utility flags"