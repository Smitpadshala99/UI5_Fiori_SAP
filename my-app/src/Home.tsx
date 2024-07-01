import { Avatar, Card, CardHeader, Text, 
    Icon, ShellBar, ShellBarItem, List, 
    StandardListItem, CustomListItem, ValueState,
    ProgressIndicator, FlexBox, FlexBoxJustifyContent,
    FlexBoxWrap, FlexBoxDirection, AnalyticalTable
} from "@ui5/webcomponents-react";

import { spacing , ThemingParameters } from "@ui5/webcomponents-react-base"
import { BarChart, LineChart } from "@ui5/webcomponents-react-charts" 
import { useState } from "react";
import lineChartIcon from '@ui5/webcomponents-icons/dist/line-chart.js';
import barChartIcon from '@ui5/webcomponents-icons/dist/horizontal-bar-chart.js';
import addIcon from "@ui5/webcomponents-icons/dist/add.js";
import listIcon from "@ui5/webcomponents-icons/dist/list.js";
import tableViewIcon from "@ui5/webcomponents-icons/dist/table-view.js";
import { useNavigate } from "react-router-dom";
// import { MyCustomElement } from "./MyCustomeElement";

const dataset = [
    {
      month: "January",
      data: 152
    },
    {
      month: "February",
      data: 159
    },
    {
      month: "March",
      data: 120
    },
    {
      month: "April",
      data: 139
    },
    {
      month: "May",
      data: 156
    },
    {
      month: "June",
      data: 124
    },
    {
      month: "July",
      data: 152
    }
  ];
  

export function Home() {

    const [toggleCharts, setToggleCharts] = useState("lineChart");
    
    const [loading, setLoading] = useState(false);

    const contentTitle = toggleCharts === 'lineChart' ? 'Line Chart' : 'Bar Chart';
    const switchToChart = toggleCharts === 'lineChart' ? 'Bar Chart': 'Line Chart';

    const handleHeaderClick = () => {
        // alert("Header clicked");
        if(toggleCharts === 'lineChart') {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setToggleCharts("barChart");
            }, 2000);
        } else { 
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setToggleCharts("lineChart");
            },2000);
        }
    };

    const names = ['Amit', 'Sunita', 'Ravi', 'Priya', 'Rajesh', 'Anita', 'Vijay', 'Meena', 'Sanjay', 'Pooja'];
    const departments = ['Sales', 'Marketing', 'HR', 'Engineering', 'Finance'];

    const employeeData = new Array(50).fill(null).map((_, index) => {
    return {
        employeeName: names[index % names.length],
        employeeAge: Math.floor(Math.random() * 65) + 18,
        department: departments[index % departments.length],
        manager: {
        name: names[(index + 1) % names.length], 
        age: Math.floor(Math.random() * 65) + 25 
        }
    };
    });

    const employeeColumns = [
    {
        Header: "Employee Name",
        accessor: "employeeName" // String-based value accessors!
    },
    {
        Header: "Employee Age",
        accessor: "employeeAge"
    },
    {
        Header: "Department",
        accessor: "department"
    },
    {
        Header: "Manager Name",
        accessor: "manager.name"
    },
    {
        Header: "Manager Age",
        accessor: "manager.age"
    }
    ];

    const navigate = useNavigate();
    const handleProgressHeaderClick = () => {
        navigate("/detail");
    };

    return ( 
        <div>
            {/* <ShellBar
                logo={<img src="reactLogo.png" />} 
                primaryTitle="My App" 
                profile={<Avatar>
                            <img src="profilePictureExample.png" />
                        </Avatar>}    
                >
                <ShellBarItem icon={addIcon} text="Add" />
            </ShellBar> */}
            <FlexBox
                justifyContent={FlexBoxJustifyContent.Center}
                wrap={FlexBoxWrap.Wrap}
                style={spacing.sapUiContentPadding}
            >
                {/* <MyCustomElement/> */}
                <Card header={<CardHeader 
                                titleText="Working Hours per Month"
                                subtitleText= {`Click here to switch to ${switchToChart}`} 
                                interactive
                                onClick={handleHeaderClick}
                                avatar={
                                    <Icon
                                        name={
                                            toggleCharts === "lineChart" ? lineChartIcon : barChartIcon
                                        }
                                    />
                                }
                                />
                            } 
                            style={{ width: '400px', ...spacing.sapUiContentPadding }} 
                        >
                        <Text style={spacing.sapUiContentPadding}>{contentTitle}
                            {/* This is the content area of a Card! */}
                        </Text>
                    
                    {/* <LineChart 
                        measures={[{ accessor: "data", label: "Working Hours" }]} 
                        dimensions={[{ accessor: "month" }]}
                        dataset={dataset} 
                    />
                    <BarChart
                        measures={[{ accessor:"data", label:"Working Hours" }]}
                        dimensions={[{accessor:"month"}]}
                        dataset={dataset}
                    /> */}

                    { toggleCharts === 'lineChart' ? (
                        <LineChart 
                            measures={[{ accessor: "data", label: "Working Hours" }]} 
                            dimensions={[{ accessor: "month" }]}
                            dataset={dataset} 
                            loading={loading}
                        />
                        ) : (
                        <BarChart
                            measures={[{ accessor:"data", label:"Working Hours" }]}
                            dimensions={[{accessor:"month"}]}
                            dataset={dataset}
                            loading = {loading}
                        /> 
                    )}
                </Card>
                <Card header={
                    <CardHeader
                        titleText="Progess"
                        subtitleText="List"
                        avatar={<Icon name={listIcon} />}
                        interactive
                        onClick={handleProgressHeaderClick}
                    />
                }
                style={{ width: "400px" , ...spacing.sapUiContentPadding}}
                >
                    <List>
                        <StandardListItem additionalText="finished" additionalTextState={ValueState.Success}>Activity 1</StandardListItem>
                        <StandardListItem additionalText="failed" additionalTextState={ValueState.Error}>Activity 2</StandardListItem>
                        <CustomListItem>
                            <FlexBox direction={FlexBoxDirection.Column}
                                style={{ width: "100%", ...spacing.sapUiSmallMarginTopBottom }}
                                >
                                <FlexBox justifyContent={FlexBoxJustifyContent.SpaceBetween}>
                                    <Text style={{ fontSize: ThemingParameters.sapFontLargeSize }}>Activity 3</Text>
                                    <Text style={{ color: ThemingParameters.sapCriticalColor }}>in progress</Text>
                                </FlexBox>
                                <ProgressIndicator 
                                    value={75} 
                                    valueState={ValueState.Success}
                                    style={{ ...spacing.sapUiTinyMarginTop}}
                                    ></ProgressIndicator>
                            </FlexBox>
                        </CustomListItem>
                        <CustomListItem>
                        <FlexBox direction={FlexBoxDirection.Column}
                                style={{ width: "100%", ...spacing.sapUiSmallMarginTopBottom }}
                                >
                                <FlexBox justifyContent={FlexBoxJustifyContent.SpaceBetween}>
                                    <Text style={{ fontSize: ThemingParameters.sapFontLargeSize }}>Activity 4</Text>
                                    <Text style={{ color: ThemingParameters.sapErrorColor }}>runtime error</Text>
                                </FlexBox>
                                <ProgressIndicator value={10} valueState={ValueState.Error} style={{ ...spacing.sapUiTinyMarginTop}}></ProgressIndicator>
                            </FlexBox>
                        </CustomListItem>
                    </List>
                </Card>
                <Card header={
                    <CardHeader 
                        titleText="AnalyticalTable"
                        avatar={ <Icon name={tableViewIcon} />}
                    />
                } style={{ maxWidth: "90%" , ...spacing.sapUiContentPadding }}
                >
                    <AnalyticalTable data={employeeData} columns={employeeColumns} visibleRows={5} />

                </Card>
            </FlexBox>
           </div>
        );
    }